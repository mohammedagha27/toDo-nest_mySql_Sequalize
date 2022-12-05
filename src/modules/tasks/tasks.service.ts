import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TasksDTO } from './dto/create-task.dto';
import { tasks } from './mock/tasks-mock';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASK_REPOSITORY') private tasksRepository: typeof Task,
  ) {}
  tasksData = tasks;

  async createTask({ title, userId }): Promise<Task> {
    return await this.tasksRepository.create<Task>({ title, userId });
  }

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.findAll();
  }
  async deleteTask(id: number) {
    const deletedCount = await this.tasksRepository.destroy({ where: { id } });
    if (!deletedCount) throw new NotFoundException('task not found');
    return 'Task deleted';
  }
  async markAsDone(id: number) {
    const UpdatedCount = await this.tasksRepository.update(
      {
        status: 'done',
      },
      {
        where: { id },
      },
    );
    if (!UpdatedCount[0]) throw new NotFoundException('Task not Found');
    return 'Task updated';
  }
  async findAllWhere(where: any) {
    return await this.tasksRepository.findAll(where);
  }
}
