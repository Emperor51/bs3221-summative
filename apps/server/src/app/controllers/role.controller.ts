import { Controller, Get, Post, Body, UseGuards, Delete, Param } from '@nestjs/common';
import { RoleService } from "../services/role.service";
import { Role } from "../entities/role.entity";
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RbacGuard } from '../guards/rbac.guard';
import { Permissions } from '../decorators/permissions.decorator';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Permissions('roles.create')
  @UseGuards(JwtAuthGuard, RbacGuard)
  @Post()
  async createRole(@Body() body: Role) {
    return this.roleService.createRole(body);
  }

  @Permissions('roles.read')
  @UseGuards(JwtAuthGuard, RbacGuard)
  @Get()
  async getRoles() {
    return this.roleService.getRoles();
  }

  @Permissions('roles.delete')
  @UseGuards(JwtAuthGuard, RbacGuard)
  @Delete(':id')
  async deleteRole(@Param('id') id: number) {
    return this.roleService.deleteRole(id);
  }
} 
