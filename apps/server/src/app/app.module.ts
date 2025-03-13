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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3170,
      username: 'user',
      password: 'password',
      database: 'fmdb',
      entities: [Log, User, Role],
      synchronize: true,
    }),

    TypeOrmModule.forFeature([Log, User, Role]),
  ],
  controllers: [SubmissionController, UserController, RoleController],
  providers: [SubmissionService, UserService, RoleService],
})
export class AppModule {}
