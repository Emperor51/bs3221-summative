import { Body, Controller, Get, Post, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { RbacGuard } from '../guards/rbac.guard';
import { Permissions, SelfPermission } from '../decorators/permissions.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UpdateUserReqDto } from '../dtos/UpdateUserReq.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @SelfPermission('users.delete.self', 'User', 'id')
  @Permissions('users.delete.all')
  @UseGuards(JwtAuthGuard, RbacGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.userService.delete(id);
  }

  @Permissions('users.activate')
  @UseGuards(JwtAuthGuard, RbacGuard)
  @Patch('activate/:id')
  async activate(@Param('id') id: string) {
    await this.userService.activate(id);
  }

  @Permissions('users.deactivate')
  @UseGuards(JwtAuthGuard, RbacGuard)
  @Patch('deactivate/:id')
  async deactivate(@Param('id') id: string) {
    await this.userService.deactivate(id);
  }

  @Permissions('users.create')
  @UseGuards(JwtAuthGuard, RbacGuard)
  @Post('create')
  async create(@Body() user: User) {
    await this.userService.create(user);
  }

  @SelfPermission('users.update.self', 'User', 'id')
  @Permissions('users.update.all')
  @UseGuards(JwtAuthGuard, RbacGuard)
  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() user: UpdateUserReqDto) {
    await this.userService.update(id, user);
  }

  @SelfPermission('users.view.self', 'User', 'id')
  @Permissions('users.view.all')
  @Get(':id')
  async getUser(id) {
    return this.userService.getUser(id);
  }

  @Permissions('users.view.all')
  @UseGuards(JwtAuthGuard, RbacGuard)
  @Get('all')
  async getUsers() {
      return this.userService.getUsers();
  }
}
