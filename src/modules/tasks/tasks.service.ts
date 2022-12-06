import {
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TASK_REPOSITORY } from 'src/common/constants';
import { AuthenticatedUser } from 'src/common/interfaces';
import { TasksDTO } from './dto/create-task.dto';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  constructor(@Inject(TASK_REPOSITORY) private tasksRepository: typeof Task) {}
  async createTask(TasksDTO: TasksDTO, userId: number): Promise<Task> {
    const { title } = TasksDTO;
    return await this.tasksRepository.create<Task>({ title, userId: userId });
  }

  async findAll(userId: number): Promise<Task[]> {
    return this.tasksRepository.findAll({ where: { userId } });
  }
  async deleteTask(taskId: number, userId: number) {
    const task = await this.findUserTaskById(taskId, userId);
    await task.destroy();
    return 'Task deleted';
  }
  async markAsDone(taskId: number, userId: number) {
    const task = await this.findUserTaskById(taskId, userId);
    task.update(
      {
        status: 'done',
      },
      {
        where: { id: taskId },
      },
    );
    return 'Task updated';
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
