import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserReqDto } from '../dtos/UpdateUserReq.dto';
import { Role } from '../entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {
  }

  async create(userDto: Partial<User>): Promise<User> {
    const { id, email, password, firstName, lastName, role } = userDto;

    // Check if the email is already in use
    const existingUser = await this.userRepository.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = this.userRepository.create({
      id,
      email,
      password: hashedPassword,
      firstName,
      lastName,
      role,
    });

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

  async update(id: string, user: UpdateUserReqDto): Promise<void> {
    const role: Role = await this.roleRepository.findOne({ where: { id: user.roleId } });
    user.role = role;
    await this.userRepository.update(id, user);
  }

  async getUsers(): Promise<any> {
    return this.userRepository.find({
      select: ['id', 'email', 'firstName', 'lastName', 'active'],
      relations: ['role'],
      loadEagerRelations: false,
    }).then(users => {
      return users.map(user => ({
        ...user,
        role: {
          id: user.role.id,
          role: user.role.role,
        }
      }));
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email }, relations: ['role'] });
  }

  async getUser(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

}