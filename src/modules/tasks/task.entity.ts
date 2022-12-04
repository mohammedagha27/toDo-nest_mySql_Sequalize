import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class Task extends Model {
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
  title: number;

  @Column({
    type: DataType.ENUM,
    values: ['todo', 'done'],
    defaultValue: 'todo',
  })
  status: string;
}
