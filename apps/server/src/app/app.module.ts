import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './entities/log.entity';
import { SubmissionController } from './controllers/submission.controller';
import { SubmissionService } from './services/submission.service';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { User } from './entities/user.entity';
import { Role } from './entities/role.entity';
import { RoleService } from './services/role.service';
import { RoleController } from './controllers/role.controller';
import { LocationController } from './controllers/location.controller';
import { LocationService } from './services/location.service';
import { Location } from './entities/location.entity'
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { Permission } from './entities/permission.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { RbacGuard } from './guards/rbac.guard';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RefreshToken } from './entities/refresh_token.entity';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecretkey',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3170,
      username: 'user',
      password: 'password',
      database: 'fmdb',
      entities: [Log, User, Role, Location, Permission, RefreshToken],
      synchronize: true,
    }),

    TypeOrmModule.forFeature([Log, User, Role, Location, Permission, RefreshToken]),
  ],
  controllers: [SubmissionController, UserController, RoleController, LocationController, AuthController],
  providers: [SubmissionService, UserService, RoleService, LocationService, AuthService, JwtStrategy, JwtAuthGuard, RbacGuard ]})
export class AppModule {}
