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
    const user = await this.userRepository.findOne({
      where: { email, active: true },
      relations: ['role', 'role.permissions'], // ✅ Ensure permissions are loaded
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new UnauthorizedException('Invalid credentials');

    // Get user permissions
    const userPermissions = user.role.permissions.map((p) => p.name) || [];

    // Generate access token including permissions
    const accessPayload = { sub: user.id, email: user.email, role: user.role.role, permissions: userPermissions };
    const accessToken = this.jwtService.sign(accessPayload);

    // Generate refresh token without permissions
    const refreshPayload = { sub: user.id, email: user.email, role: user.role.role };
    const refreshTokenPlain = this.jwtService.sign(refreshPayload, { expiresIn: '7d' });

    // Hash the refresh token before storing
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

    return { accessToken, refreshToken: refreshTokenPlain };
  }


  async refresh(refreshToken: string) {
    // Clean up expired refresh tokens
    await this.refreshTokenRepository.delete({ expiresAt: LessThan(new Date()) });

    // Load user, role, and permissions when fetching refresh tokens
    const storedTokens = await this.refreshTokenRepository.find({
      relations: ['user', 'user.role', 'user.role.permissions'],
    });

    // Check if any stored token matches
    const storedToken = storedTokens.find((token) =>
      bcrypt.compareSync(refreshToken, token.hashedToken)
    );

    if (!storedToken) throw new ForbiddenException('Invalid or expired refresh token');

    const user = storedToken.user;

    // Ensure permissions exist before mapping
    const userPermissions = user?.role?.permissions?.map((p) => p.name) || [];

    // Generate new access token including permissions
    const accessPayload = {
      sub: user.id,
      email: user.email,
      role: user.role.role,
      permissions: userPermissions,
    };
    const newAccessToken = this.jwtService.sign(accessPayload);

    // Generate refresh token without permissions (keep it lightweight)
    const refreshPayload = {
      sub: user.id,
      email: user.email,
      role: user.role.role,
    };
    const newRefreshTokenPlain = this.jwtService.sign(refreshPayload, { expiresIn: '7d' });

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

  async resetPassword(userId: number, password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await this.userRepository.update(userId, { password: hashedPassword });
  }

}
