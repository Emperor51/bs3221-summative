import { Controller, Post, Body, Req, UseGuards, HttpException, Get } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RbacGuard } from '../guards/rbac.guard';
import { Permissions } from '../decorators/permissions.decorator';
import { UpdatePasswordDto } from '../dtos/UpdatePassword.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { email, password }: { email: string; password: string }, @Req() req) {
    if (req.ip === undefined || req.headers['user-agent'] === undefined) {
      return new HttpException("Request is missing IP or User-Agent", 400);
    }

    return await this.authService.login(email, password, req.ip, req.headers['user-agent']);
  }

  @Post('refresh')
  async refresh(@Body() { refreshToken }: { refreshToken: string }) {
    return await this.authService.refresh(refreshToken);
  }

  @Post('logout')
  async logout(@Body() { refreshToken }: { refreshToken: string }) {
    if (!refreshToken) {
      return new HttpException("Refresh token is required", 400);
    }
    return await this.authService.logout(refreshToken);
  }

  @Post('logout-all')
  @UseGuards(JwtAuthGuard)
  async logoutAll(@Req() req) {
    return await this.authService.logoutAll(req.user.id);
  }

  /**
   * Reset Password
   * @param body
   */
  @Permissions('user.password.reset.all')
  @UseGuards(JwtAuthGuard, RbacGuard)
  @Post('reset-password')
  async resetPassword(@Body() body: UpdatePasswordDto) {
    return await this.authService.resetPassword(body.userId, body.password);
  }
}
