import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { RefreshToken } from '../entities/refresh_token.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(RefreshToken) private refreshTokenRepository: Repository<RefreshToken>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email, active: true } });
    if (!user) return null;

    const isValidPassword = await bcrypt.compare(password, user.password);
    return isValidPassword ? user : null;
  }

  async login(email: string, password: string, ipAddress: string, userAgent: string) {
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const payload = { sub: user.id, email: user.email, role: user.role.role };
    const accessToken = this.jwtService.sign(payload);
    const refreshTokenPlain = this.jwtService.sign(payload, { expiresIn: '7d' });
    const userPermissions = user.role.permissions.map((p) => p.name);

    // Hash the refresh token before storing it
    const hashedRefreshToken = await bcrypt.hash(refreshTokenPlain, 10);

    // Store refresh token in DB
    const newRefreshToken = this.refreshTokenRepository.create({
      hashedToken: hashedRefreshToken,
      user,
      ipAddress,
      userAgent,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
    });
    await this.refreshTokenRepository.save(newRefreshToken);

    return { accessToken, refreshToken: refreshTokenPlain, permissions: userPermissions };
  }

  async refresh(refreshToken: string) {
    // Clean up expired refresh tokens
    await this.refreshTokenRepository.delete({ expiresAt: LessThan(new Date()) });

    // Find the refresh token in the DB
    const storedTokens = await this.refreshTokenRepository.find({
      relations: ['user'],
    });

    // Check if any stored token matches
    const storedToken = storedTokens.find((token) =>
      bcrypt.compareSync(refreshToken, token.hashedToken)
    );

    if (!storedToken) throw new ForbiddenException('Invalid or expired refresh token');

    // Generate new tokens
    const payload = { sub: storedToken.user.id, email: storedToken.user.email, role: storedToken.user.role.role };
    const newAccessToken = this.jwtService.sign(payload);
    const newRefreshTokenPlain = this.jwtService.sign(payload, { expiresIn: '7d' });

    // Hash the new refresh token
    const newHashedRefreshToken = await bcrypt.hash(newRefreshTokenPlain, 10);

    // Replace old refresh token with the new one
    storedToken.hashedToken = newHashedRefreshToken;
    storedToken.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // Reset expiry
    await this.refreshTokenRepository.save(storedToken);

    return { accessToken: newAccessToken, refreshToken: newRefreshTokenPlain };
  }

  async logout(refreshToken: string) {
    const storedTokens = await this.refreshTokenRepository.find();
    const storedToken = storedTokens.find((token) =>
      bcrypt.compareSync(refreshToken, token.hashedToken)
    );

    if (storedToken) {
      await this.refreshTokenRepository.delete({ id: storedToken.id });
    }

    return { message: 'Logged out successfully' };
  }

  async logoutAll(userId: number) {
    await this.refreshTokenRepository.delete({ user: { id: userId } });
    return { message: 'Logged out from all devices' };
  }
}
