import { Inject, Injectable } from '@nestjs/common';
import { TasksDTO } from './dto/create-task.dto';
import { tasks } from './mock/tasks-mock';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @Inject('Tasks_REPOSITORY') private tasksRepository: typeof Task,
  ) {}
  tasksData = tasks;

  async createTask(title: string): Promise<Task> {
    return await this.tasksRepository.create<Task>({ title });
  }

  async findAll(): Promise<Task[]> {
    return this.tasksRepository.findAll();
  }
  async deleteTask(id: number) {
    return this.tasksRepository.destroy({ where: { id } });
  }
  markAsDone(id: number) {
    return this.tasksRepository.update(
      {
        status: 'done',
      },
      {
        where: { id },
      },
    );
  }
}
