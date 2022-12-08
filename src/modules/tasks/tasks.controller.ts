import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksDTO } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { User } from 'src/common/decorators';
import { Auth } from 'src/common/decorators';
import { ADMIN_ROLE } from 'src/common/constants';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Auth(ADMIN_ROLE)
  @Get()
  async getAllTasks(
    @User('id') userId: number,
    @Query('offset') offset?: number,
    @Query('limit') limit?: number,
  ) {
    return this.taskService.findAll(userId, offset, limit);
  }

  @Auth(ADMIN_ROLE)
  @Get(':taskId')
  async getSingleTask(
    @Param('taskId', ParseIntPipe) taskId: number,
    @User('id') userId: number,
  ) {
    return this.taskService.findUserTaskById(taskId, userId);
  }

  @Auth(ADMIN_ROLE)
  @Post()
  async addTask(@Body() TasksDTO: TasksDTO, @User('id') userId: number) {
    return this.taskService.createTask(TasksDTO, userId);
  }

  @Auth(ADMIN_ROLE)
  @Delete(':id')
  async deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @User('id') userId: number,
  ) {
    return await this.taskService.deleteTask(id, userId);
  }

  @Auth(ADMIN_ROLE)
  @Patch(':id')
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @User('id') userId: number,
    @Body('title') title: string,
  ) {
    return await this.taskService.updateTaskTitle(id, userId, title);
  }

  @Auth(ADMIN_ROLE)
  @Patch('/mark-done/:id')
  async markAsDone(
    @Param('id', ParseIntPipe) id: number,
    @User('id') userId: number,
  ) {
    return await this.taskService.markAsDone(id, userId);
  }
}
