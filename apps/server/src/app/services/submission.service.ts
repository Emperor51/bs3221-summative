import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Log } from '../entities/log.entity'; // Ensure correct path to entity
import { SubmissionReq } from '../dtos/SubmissionReq.dto';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,
  ) {}

  async getSubmissions(entryTime: string, exitTime: string) {
    return this.logRepository.find({
      where: {
        entryTime: new Date(entryTime),
        exitTime: new Date(exitTime),
      },
    });
  }

  async createSubmission(submission: SubmissionReq) {
    const logEntry = this.logRepository.create({
      // userId: submission,
      entryTime: new Date(submission.entryTime),
      exitTime: new Date(submission.exitTime),
      location: `${submission.location}`,
    });

    return this.logRepository.save(logEntry);
  }

  async getSubmission(id: number) {
    return this.logRepository.findOne({ where: { id } });
  }

  async getAllSubmissions(entryTime: string, exitTime: string) {
    return this.logRepository.find({
      where: {
        entryTime: new Date(entryTime),
        exitTime: new Date(exitTime),
      },
    });
  }

  async deleteSubmission(id: number) {
    return this.logRepository.delete(id);
  }
}
