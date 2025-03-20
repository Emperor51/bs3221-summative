import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, MoreThanOrEqual, LessThanOrEqual, IsNull } from 'typeorm';
import { Log } from '../entities/log.entity'; // Ensure correct path to entity
import { User } from '../entities/user.entity';
import { Location } from '../entities/location.entity';
import { LocationDto } from '../dtos/location.dto';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Log)
    private readonly logRepository: Repository<Log>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Location)
    private readonly locationRepository: Repository<Location>,
  ) {}

  async getSubmissions(userId: number, entryTime: string, exitTime: string) {
    return this.logRepository.find({
      relations: ['user', 'location'],
      select: {
        id: true,
        entryTime: true,
        exitTime: true,
        user: {
          id: true,
          firstName: true,
          lastName: true,
        },
        location: {
          id: true,
          name: true,
          building: true,
        },
      },
      where: [
        {
          user: { id: userId },
          entryTime: LessThanOrEqual(new Date(exitTime)),
          exitTime: MoreThanOrEqual(new Date(entryTime)),
        },
        {
          user: { id: userId },
          entryTime: LessThanOrEqual(new Date(exitTime)),
          exitTime: IsNull(),
        },
      ],
    });
  }



  async createSubmission(userId: number, submission: LocationDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    const location = await this.locationRepository.findOne({ where: { id: submission.location } });
    if (!location) {
      throw new Error(`Location with ID ${submission.location} not found`);
    }

    const logEntry = this.logRepository.create({
      user,
      entryTime: new Date(submission.entryTime),
      exitTime: submission.exitTime ? new Date(submission.exitTime) : null,
      location
    });

    return this.logRepository.save(logEntry);
  }


  async getSubmission(id: number) {
    return this.logRepository.findOne({ where: { id } });
  }

  async getAllSubmissions(entryTime: string, exitTime: string) {
    return this.logRepository.find({
      relations: ['user', 'location'],
      select: {
        id: true,
        entryTime: true,
        exitTime: true,
      },
      where: [
        {
          entryTime: LessThanOrEqual(new Date(exitTime)),
          exitTime: MoreThanOrEqual(new Date(entryTime)),
        },
        {
          entryTime: LessThanOrEqual(new Date(exitTime)),
          exitTime: IsNull(),
        },
      ],
      loadEagerRelations: false,
    }).then(logs => logs.map(log => ({
      id: log.id,
      entryTime: log.entryTime,
      exitTime: log.exitTime,
      user: {
        id: log.user.id,
        firstName: log.user.firstName,
        lastName: log.user.lastName,
        email: log.user.email,
      },
      location: {
        id: log.location.id,
        name: log.location.name,
      }
    })));
  }



  async deleteSubmission(id: number) {
    return this.logRepository.delete(id);
  }

  async updateSubmission(id: number, submission: LocationDto) {
    const log = await this.logRepository.findOne({ where: { id }, relations: ['user', 'location'] });
    if (!log) {
      throw new Error(`Log entry with ID ${id} not found`);
    }

    // Ensure user and location are valid
    const location = submission.location ? await this.locationRepository.findOne({ where: { id: submission.location } }) : log.location;

    return await this.logRepository.update(id, {
      location,
      entryTime: new Date(submission.entryTime),
      exitTime: submission.exitTime ? new Date(submission.exitTime) : null,
    });
  }

}
