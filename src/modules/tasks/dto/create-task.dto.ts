import { IsNotEmpty, IsNumber } from 'class-validator';
export class TasksDTO {
  id?: number;
  @IsNotEmpty()
  userId: number;
  @IsNotEmpty()
  title: string;
  status?: string;
}
