import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { TasksService } from '../tasks/tasks.service';
import { Task } from '../tasks/task.model';
import { AuthApiResponse } from './interfaces';
import { UsersGuard } from '../../common/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('auth/signup')
  async signup(@Body() UserDto: UserDto): Promise<AuthApiResponse> {
    return await this.usersService.create(UserDto);
  }
  @Post('auth/login')
  async login(@Body() user: UserDto): Promise<AuthApiResponse> {
    return await this.usersService.login(user.username, user.password);
  }
  @UseGuards(UsersGuard)
  @Get('/tasks/:id')
  async findAllTasks(@Param('id') id: number): Promise<Task[]> {
    return await this.usersService.allTasks(id);
  }
}
