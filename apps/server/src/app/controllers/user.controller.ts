import { Body, Controller, Get, Post, Param, Patch, Delete } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.userService.delete(id);
  }

  @Patch('activate/:id')
  async activate(@Param('id') id: string) {
    await this.userService.activate(id);
  }

  @Patch('deactivate/:id')
  async deactivate(@Param('id') id: string) {
    await this.userService.deactivate(id);
  }

  @Post('create')
  async create(@Body() user: User) {
    await this.userService.create(user);
  }

  @Patch('update/:id')
  async update(@Param('id') id: string, @Body() user: User) {
    await this.userService.update(id, user);
  }
  
  @Get()
  async getUsers() {
      return this.userService.getUsers();
  }
}
