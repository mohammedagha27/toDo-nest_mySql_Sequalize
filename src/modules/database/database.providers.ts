import { Sequelize } from 'sequelize-typescript';
import { Task } from 'src/modules/tasks/task.model';
import { User } from 'src/modules/users/user.model';
import { databaseConfig } from 'config/database.config';
import * as dotenv from 'dotenv';
dotenv.config();

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case 'DEVELOPMENT':
          config = databaseConfig.development;
          break;
        case 'TEST':
          config = databaseConfig.test;
          break;
        case 'PRODUCTION':
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        ...config,
      });
      sequelize.addModels([Task, User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
