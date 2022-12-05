import {
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
  async addTask(@Body() TasksDTO: TasksDTO) {
    return this.taskService.createTask(TasksDTO);
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
