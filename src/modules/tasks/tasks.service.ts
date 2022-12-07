import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TASK_REPOSITORY } from 'src/common/constants';
import { TasksDTO } from './dto/create-task.dto';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  constructor(@Inject(TASK_REPOSITORY) private tasksRepository: typeof Task) {}

  async createTask(TasksDTO: TasksDTO, userId: number): Promise<Task> {
    const { title } = TasksDTO;
    return await this.tasksRepository.create<Task>({ title, userId: userId });
  }

  async findAll(userId: number, qOffset: number, qLimit: number): Promise<any> {
    const offset = Number(qOffset) || 0;
    const limit = Number(qLimit) || 10;

    const data = await this.tasksRepository.findAll({
      where: { userId },
      offset,
      limit,
    });

    return { data, pageInfo: { offset, limit } };
  }

  async deleteTask(taskId: number, userId: number): Promise<void> {
    const task = await this.findUserTaskById(taskId, userId);
    await task.destroy();
    return;
  }

  async updateTaskTitle(taskId: number, userId: number, title: string) {
    const task = await this.findUserTaskById(taskId, userId);
    if (!title) throw new BadRequestException('title must not be empty');
    task.update({ title });
    return task;
  }

  async markAsDone(taskId: number, userId: number) {
    const task = await this.findUserTaskById(taskId, userId);
    task.update({ status: 'done' }, { where: { id: taskId } });
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
