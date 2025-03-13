import { Controller, Get, Post, Body } from "@nestjs/common";
import { RoleService } from "../services/role.service";
import { Role } from "../entities/role.entity";

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async createRole(@Body() body: Role) {
    return this.roleService.createRole(body);
  }

  @Get()
  async getRoles() {
    return this.roleService.getRoles();
  }
} 
