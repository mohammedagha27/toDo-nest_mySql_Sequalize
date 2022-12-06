import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TasksDTO } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { User } from 'src/common/decorators';
import { Auth } from 'src/common/decorators';
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Auth('admin')
  @Get()
  async getAllTasks(@User('id') userId: number) {
    return this.taskService.findAll(userId);
  }

  @Auth('admin')
  @Get(':taskId')
  async getSingleTask(
    @Param('taskId', ParseIntPipe) taskId: number,
    @User('id') userId: number,
  ) {
    return this.taskService.findUserTaskById(taskId, userId);
  }

  @Auth('admin')
  @Post()
  async addTask(@Body() TasksDTO: TasksDTO, @User('id') userId: number) {
    return this.taskService.createTask(TasksDTO, userId);
  }

  @Auth('admin')
  @Delete(':id')
  async deleteTask(
    @Param('id', ParseIntPipe) id: number,
    @User('id') userId: number,
  ) {
    return await this.taskService.deleteTask(id, userId);
  }

  @Auth('admin')
  @Patch(':id')
  async markAsDone(
    @Param('id', ParseIntPipe) id: number,
    @User('id') userId: number,
  ) {
    return await this.taskService.markAsDone(id, userId);
  }
}
