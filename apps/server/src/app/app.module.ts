import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Log } from './entities/log.entity';
import { SubmissionController } from './controllers/submission.controller';
import { SubmissionService } from './services/submission.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3170,
      username: 'user',
      password: 'password',
      database: 'fmdb',
      entities: [Log],
      synchronize: true,
    })
  ],
  controllers: [SubmissionController],
  providers: [SubmissionService],
})
export class AppModule {}
