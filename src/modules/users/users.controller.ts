import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { TasksService } from '../tasks/tasks.service';
import { ApiResponse } from 'src/common/interfaces';
import { Task } from '../tasks/task.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post('auth/signup')
  async signup(@Body() user: UserDto): Promise<ApiResponse> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const result = await this.usersService.create(
      user.username,
      hashedPassword,
    );
    return result;
  }
  @Post('auth/login')
  async login(@Body() user: UserDto): Promise<ApiResponse> {
    const result = await this.usersService.login(user.username, user.password);
    return result;
  }
  @Get('/tasks/:id')
  async findAllTasks(@Param('id') id: number): Promise<Task[]> {
    const result = await this.usersService.allTasks(id);
    return result;
  }
}
