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
  UsePipes,
} from '@nestjs/common';
import { TaskSchema } from './dto/task.dto';
import { TasksService } from './tasks.service';
import { JoiValidationPipe } from './validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  async getAllTasks() {
    return this.taskService.findAll();
  }
  @Post()
  @UsePipes(new JoiValidationPipe(TaskSchema))
  async addTask(@Body() body: { title: string }) {
    return this.taskService.createTask(body.title);
  }
  @Delete(':id')
  async deleteTask(@Param('id', ParseIntPipe) id: number) {
    const res = await this.taskService.deleteTask(id);
    if (!res) throw new BadRequestException('Task not Found');
    return 'Task deleted';
  }
  @Patch(':id')
  async markAsDone(@Param('id', ParseIntPipe) id: number) {
    const res = await this.taskService.markAsDone(id);
    if (!res[0]) throw new BadRequestException('Task not Found');
    return 'Task updated';
  }
}
