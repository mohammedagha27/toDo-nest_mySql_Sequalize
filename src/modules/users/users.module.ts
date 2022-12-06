import { Module } from '@nestjs/common';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  providers: [UsersService, ...usersProviders],
  exports: [UsersService],
  imports: [JwtModule.register({ secret: process.env.SECRET_KEY })],
  controllers: [UsersController],
})
export class UsersModule {}
