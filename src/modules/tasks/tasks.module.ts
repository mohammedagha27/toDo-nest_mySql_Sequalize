import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/core/database/database.module';
import { UsersModule } from '../users/users.module';
import { TasksController } from './tasks.controller';
import { tasksProviders } from './tasks.providers';
import { TasksService } from './tasks.service';

@Module({
  imports: [DatabaseModule],
  controllers: [TasksController],
  providers: [TasksService, ...tasksProviders],
  exports: [TasksService],
})
export class TasksModule {}
