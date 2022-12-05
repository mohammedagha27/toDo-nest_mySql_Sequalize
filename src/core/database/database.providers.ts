import { Sequelize } from 'sequelize-typescript';
// import { Cat } from '../cats/cat.entity';
import * as dotenv from 'dotenv';
import { Task } from 'src/modules/tasks/task.entity';
import { User } from 'src/modules/users/user.entity';

dotenv.config();

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
      });
      sequelize.addModels([Task, User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
