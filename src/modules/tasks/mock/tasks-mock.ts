import { TasksDTO } from '../dto/create-task.dto';

export const tasks: TasksDTO[] = [
  {
    id: 1,
    title: 'Generate apps',
    status: 'done',
  },
  {
    id: 2,
    title: 'Connect DB',
    status: 'todo',
  },
  {
    id: 3,
    title: 'Set up the client',
    status: 'todo',
  },
];
