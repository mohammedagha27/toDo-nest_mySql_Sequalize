import { IsNotEmpty, IsEnum } from 'class-validator';
enum taskStatus {
  done = 'done',
  todo = 'FEMALE',
}
export class TasksDTO {
  id?: number;
  @IsNotEmpty()
  title: string;
  @IsEnum(taskStatus)
  status?: string;
}
