import { IsEnum } from 'class-validator';
import {
  Table,
  Column,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
  PrimaryKey,
  IsInt,
  AutoIncrement,
  AllowNull,
  Default,
} from 'sequelize-typescript';
import { User } from '../users/user.model';

@Table
export class Task extends Model {
  @PrimaryKey
  @IsInt
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;
  @AllowNull(false)
  @Column(DataType.STRING)
  title: number;

  @AllowNull(false)
  @IsEnum(['todo', 'done'])
  @Default('todo')
  @Column
  status: string;
}
