import { Module } from '@nestjs/common';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { Sequelize } from 'sequelize';
import { databaseProviders } from '../database/database.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  providers: [UsersService, ...usersProviders],
  exports: [UsersService],
  imports: [
    JwtModule.register({ secret: process.env.SECRET_KEY }),
    DatabaseModule,
  ],
  controllers: [UsersController],
})
export class UsersModule {}
