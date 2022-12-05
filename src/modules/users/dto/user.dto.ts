import { IsNotEmpty, MinLength } from 'class-validator';

export class UserDto {
  id?: number;
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
