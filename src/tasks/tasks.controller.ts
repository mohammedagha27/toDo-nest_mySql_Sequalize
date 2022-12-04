import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksDTO } from './dto/task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  async getAllTasks(): Promise<TasksDTO[]> {
    return this.taskService.findAll();
  }
  @Post()
  async addTask(@Body('title') title: string): Promise<TasksDTO[]> {
    return this.taskService.createTask(title);
  }
  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) id: number): Promise<TasksDTO[]> {
    const task = this.taskService.findTask(id);
    if (!task) throw new BadRequestException('task not found');
    return this.taskService.deleteTask(id);
  }
  @Patch(':id')
  async markAsDone(@Param('id', ParseIntPipe) id: number): Promise<TasksDTO[]> {
    const task = this.taskService.findTask(id);
    if (!task) throw new BadRequestException('task not found');
    return this.taskService.markAsDone(id);
  }
}
