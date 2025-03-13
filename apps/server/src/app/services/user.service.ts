import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
  }

  async create(user: User): Promise<User> {
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async deactivate(id: string): Promise<void> {
    await this.userRepository.update(id, { active: false });
  }

  async activate(id: string): Promise<void> {
    await this.userRepository.update(id, { active: true });
  }

  async update(id: string, user: User): Promise<void> {
    await this.userRepository.update(id, user);
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.find();
  }
}