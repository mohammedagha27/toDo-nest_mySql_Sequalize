import { IsNotEmpty } from 'class-validator';
export class TasksDTO {
  id?: number;
  @IsNotEmpty()
  title: string;
  status?: string;
}
