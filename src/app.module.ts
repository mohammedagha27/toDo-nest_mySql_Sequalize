import { Module } from '@nestjs/common';
import { TasksModule } from './modules/tasks/tasks.module';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TasksModule,
    DatabaseModule,
  ],
})
export class AppModule {}
