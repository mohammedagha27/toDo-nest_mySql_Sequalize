import { TasksDTO } from '../dto/create-task.dto';

export const tasks: TasksDTO[] = [
  {
    id: 1,
    userId: 1,
    title: 'Generate apps',
    status: 'done',
  },
  {
    id: 2,
    userId: 1,
    title: 'Connect DB',
    status: 'todo',
  },
  {
    id: 3,
    userId: 2,
    title: 'Set up the client',
    status: 'todo',
  },
];
