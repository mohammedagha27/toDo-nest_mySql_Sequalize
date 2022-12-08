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
  UseInterceptors,
} from '@nestjs/common';
import { TasksDTO } from './dto/create-task.dto';
import { TasksService } from './tasks.service';
import { TransactionParam, User } from 'src/common/decorators';
import { Auth } from 'src/common/decorators';
import { ADMIN_ROLE } from 'src/common/constants';
import { TransactionInterceptor } from 'src/common/interceptors';
import { Transaction } from 'sequelize';
import { PageInfoQueryDTO } from './dto/pageInfo.dto';
import { PageInfoInterceptor } from 'src/common/interceptors/pageInfo.interceptor';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Auth(ADMIN_ROLE)
  @UseInterceptors(PageInfoInterceptor)
  @Get()
  async getAllTasks(
    @User('id') userId: number,
    @Query() pageInfoQueryDTO?: PageInfoQueryDTO,
  ) {
    return this.taskService.findAll(userId, pageInfoQueryDTO);
  }

  @Auth(ADMIN_ROLE)
  @Get(':taskId')
  async getSingleTask(
    @Param('taskId', ParseIntPipe) taskId: number,
    @User('id') userId: number,
  ) {
    return this.taskService.findUserTaskById(taskId, userId);
  }

  @UseInterceptors(TransactionInterceptor)
  @Auth(ADMIN_ROLE)
  @Post()
  async addTask(
    @TransactionParam() transaction: Transaction,
    @Body() TasksDTO: TasksDTO,
    @User('id') userId: number,
  ) {
    return this.taskService.createTask(TasksDTO, userId, transaction);
  }

  @UseInterceptors(TransactionInterceptor)
  @Auth(ADMIN_ROLE)
  @Delete(':id')
  async deleteTask(
    @TransactionParam() transaction: Transaction,
    @Param('id', ParseIntPipe) id: number,
    @User('id') userId: number,
  ) {
    return await this.taskService.deleteTask(id, userId, transaction);
  }

  @UseInterceptors(TransactionInterceptor)
  @Auth(ADMIN_ROLE)
  @Patch(':id')
  async updateTask(
    @TransactionParam() transaction: Transaction,
    @Param('id', ParseIntPipe) id: number,
    @User('id') userId: number,
    @Body('title') title: string,
  ) {
    return await this.taskService.updateTaskTitle(
      id,
      userId,
      title,
      transaction,
    );
  }

  @UseInterceptors(TransactionInterceptor)
  @Auth(ADMIN_ROLE)
  @Patch('/mark-done/:id')
  async markAsDone(
    @TransactionParam() transaction: Transaction,
    @Param('id', ParseIntPipe) id: number,
    @User('id') userId: number,
  ) {
    return await this.taskService.markAsDone(id, userId, transaction);
  }
}
