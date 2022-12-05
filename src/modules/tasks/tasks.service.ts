import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TASK_REPOSITORY } from 'src/common/constants';
import { TasksDTO } from './dto/create-task.dto';
import { Task } from './task.model';

@Injectable()
export class TasksService {
  constructor(@Inject(TASK_REPOSITORY) private tasksRepository: typeof Task) {}
  async createTask(TasksDTO: TasksDTO): Promise<Task> {
    const { title, userId } = TasksDTO;
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
