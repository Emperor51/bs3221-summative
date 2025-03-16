import { Injectable } from '@nestjs/common';
import { Role } from '../entities/role.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async createRole(role: Role) {
    try {
      const newRole = this.roleRepository.create(role)
      await this.roleRepository.save(newRole)
    } catch (error) {
      return error
    }
  }

  async getRoles() {
    return await this.roleRepository.find();
  }

  async deleteRole(id: number) {
    return await this.roleRepository.delete(id);
  }

}
