import { Module } from '@nestjs/common';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { TasksService } from '../tasks/tasks.service';
import { TasksModule } from '../tasks/tasks.module';
import { tasksProviders } from '../tasks/tasks.providers';

@Module({
  providers: [UsersService, ...usersProviders],
  exports: [UsersService],
  imports: [
    TasksModule,
    JwtModule.register({ secret: process.env.SECRET_KEY }),
  ],
  controllers: [UsersController],
})
export class UsersModule {}
