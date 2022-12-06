import { IsEnum } from 'class-validator';
import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  PrimaryKey,
} from 'sequelize-typescript';
import { Task } from '../tasks/task.model';

@Table
export class User extends Model<User> {
  @PrimaryKey
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column
  @IsEnum(['admin', 'user'])
  role: string;

  @HasMany(() => Task)
  tasks: Task[];
}
