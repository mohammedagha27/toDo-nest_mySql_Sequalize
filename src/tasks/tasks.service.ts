import { Injectable } from '@nestjs/common';
import { TasksDTO } from './dto/task.dto';
import { tasks } from './mock/tasks-mock';

@Injectable()
export class TasksService {
  tasksData = tasks;

  createTask(title: string) {
    const id = this.tasksData.length + 1;
    const newTask = { title, status: 'todo', id };
    this.tasksData.push(newTask);
    return this.tasksData;
  }

  findAll(): TasksDTO[] {
    return this.tasksData;
  }
  deleteTask(id: number): TasksDTO[] {
    this.tasksData = this.tasksData.filter((task) => task.id !== id);
    return this.tasksData;
  }
  markAsDone(id: number): TasksDTO[] {
    this.tasksData = this.tasksData.map((t) => {
      if (t.id === id) return { ...t, status: 'done' };
      return t;
    });
    return this.tasksData;
  }
  findTask(id: number): TasksDTO | null {
    const task = this.tasksData.find((task) => task.id === id);
    return task;
  }
}
