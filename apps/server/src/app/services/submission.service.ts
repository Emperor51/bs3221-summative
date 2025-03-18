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
      relations: ['user', 'location'], // ✅ Only fetch user & location relations
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
          exitTime: IsNull(), // ✅ Allows exitTime to be NULL
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
      user, // ✅ Store the user entity, not just ID
      entryTime: new Date(submission.entryTime),
      exitTime: submission.exitTime ? new Date(submission.exitTime) : null,
      location, // ✅ Directly reference the found location entity
    });

    return this.logRepository.save(logEntry);
  }


  async getSubmission(id: number) {
    return this.logRepository.findOne({ where: { id } });
  }

  async getAllSubmissions(entryTime: string, exitTime: string) {
    return this.logRepository.find({
      relations: ['user', 'location'], // ✅ Only fetch necessary relations
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
          entryTime: LessThanOrEqual(new Date(exitTime)),
          exitTime: MoreThanOrEqual(new Date(entryTime)),
        },
        {
          entryTime: LessThanOrEqual(new Date(exitTime)),
          exitTime: IsNull(),
        },
      ],
    });
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
      location, // ✅ Ensure we use location entity
      entryTime: new Date(submission.entryTime),
      exitTime: submission.exitTime ? new Date(submission.exitTime) : null,
    });
  }

}
