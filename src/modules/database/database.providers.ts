import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';
import { Task } from 'src/modules/tasks/task.model';
import { User } from 'src/modules/users/user.model';
import * as dotenv from 'dotenv';
import { DATABASE, SEQUELIZE } from 'src/common/constants';
dotenv.config();
export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        ...configService.get(DATABASE),
      });
      sequelize.addModels([Task, User]);
      return sequelize;
    },
    inject: [ConfigService],
  },
];
