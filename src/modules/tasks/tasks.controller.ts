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
import { TasksDTO } from './dto/create-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  async getAllTasks() {
    return this.taskService.findAll();
  }
  @Post()
  async addTask(@Body() body: TasksDTO) {
    const { title, userId } = body;
    return this.taskService.createTask({ title, userId });
  }
  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) id: number) {
    return await this.taskService.deleteTask(id);
  }
  @Patch(':id')
  async markAsDone(@Param('id', ParseIntPipe) id: number) {
    return await this.taskService.markAsDone(id);
  }
}
