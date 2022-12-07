import { Module } from '@nestjs/common';
import { TasksModule } from './modules/tasks/tasks.module';
import { DatabaseModule } from './modules/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import configurationFile from 'config';

@Module({
  imports: [
    TasksModule,
    DatabaseModule,
    UsersModule,
    ConfigModule.forRoot({
      load: [configurationFile],
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
