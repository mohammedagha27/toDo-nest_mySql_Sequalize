import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { TasksController } from './tasks.controller';
import { tasksProviders } from './tasks.providers';
import { TasksService } from './tasks.service';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [TasksController],
  providers: [TasksService, ...tasksProviders],
  exports: [TasksService],
})
export class TasksModule {}
