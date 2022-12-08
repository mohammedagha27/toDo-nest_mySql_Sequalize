import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Transaction } from 'sequelize';
import { TASK_REPOSITORY } from 'src/common/constants';
import { TasksDTO } from './dto/create-task.dto';
import { PageInfoQueryDTO } from './dto/pageInfo.dto';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  constructor(@Inject(TASK_REPOSITORY) private tasksRepository: typeof Task) {}

  async createTask(
    TasksDTO: TasksDTO,
    userId: number,
    transaction: Transaction,
  ): Promise<Task> {
    const { title } = TasksDTO;
    return await this.tasksRepository.create<Task>(
      { title, userId: userId },
      { transaction },
    );
  }

  async findAll(
    userId: number,
    pageInfoQueryDTO: PageInfoQueryDTO,
  ): Promise<any> {
    const { offset, limit } = pageInfoQueryDTO;
    console.log(limit);
    const data = await this.tasksRepository.findAll({
      where: { userId },
      offset,
      limit,
    });

    return data;
  }

  async deleteTask(taskId: number, userId: number, transaction): Promise<void> {
    const task = await this.findUserTaskById(taskId, userId);
    await task.destroy({ transaction });
    return;
  }

  async updateTaskTitle(
    taskId: number,
    userId: number,
    title: string,
    transaction: Transaction,
  ) {
    const task = await this.findUserTaskById(taskId, userId);
    if (!title) throw new BadRequestException('title must not be empty');
    task.update({ title }, { transaction });
    return task;
  }

  async markAsDone(taskId: number, userId: number, transaction: Transaction) {
    const task = await this.findUserTaskById(taskId, userId);
    task.update({ status: 'done' }, { where: { id: taskId }, transaction });
    return task;
  }

  async findAllWhere(where: any) {
    return await this.tasksRepository.findAll(where);
  }

  async findUserTaskById(taskId: number, userId: number) {
    const task = await this.tasksRepository.findByPk(taskId);
    if (!task) throw new NotFoundException('task not found');
    if (task.userId !== userId) throw new ForbiddenException();
    return task;
  }
}
