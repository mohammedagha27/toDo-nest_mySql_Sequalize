import { Task } from './task.model';

export const tasksProviders = [
  {
    provide: 'TASK_REPOSITORY',
    useValue: Task,
  },
];
