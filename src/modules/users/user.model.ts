import { IsEnum } from 'class-validator';
import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  PrimaryKey,
  IsInt,
  AutoIncrement,
  NotNull,
  AllowNull,
} from 'sequelize-typescript';
import { ADMIN_ROLE, USER_ROLE } from 'src/common/constants';
import { Task } from '../tasks/task.model';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @IsInt
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  username: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password: string;

  @AllowNull(false)
  @IsEnum([ADMIN_ROLE, USER_ROLE])
  @Column
  role: string;

  @HasMany(() => Task)
  tasks: Task[];
}
