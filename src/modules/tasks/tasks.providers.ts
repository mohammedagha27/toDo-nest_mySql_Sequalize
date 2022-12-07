import { TASK_REPOSITORY } from 'src/common/constants';
import { Task } from './task.model';

export const tasksProviders = [
  {
    provide: TASK_REPOSITORY,
    useValue: Task,
  },
];
