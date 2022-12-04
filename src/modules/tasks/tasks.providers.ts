import { Task } from './task.entity';

export const tasksProviders = [
  {
    provide: 'Tasks_REPOSITORY',
    useValue: Task,
  },
];
