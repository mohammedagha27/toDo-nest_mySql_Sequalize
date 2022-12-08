import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { AuthApiResponse } from './interfaces';
import { TransactionInterceptor } from 'src/common/interceptors';
import { TransactionParam } from 'src/common/decorators';
import { Transaction } from 'sequelize';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(TransactionInterceptor)
  @Post('signup')
  async signup(
    @TransactionParam() transaction: Transaction,
    @Body() UserDto: UserDto,
  ): Promise<AuthApiResponse> {
    return await this.usersService.create(UserDto, transaction);
  }

  @UseInterceptors(TransactionInterceptor)
  @Post('login')
  async login(
    @TransactionParam() transaction: Transaction,
    @Body() user: UserDto,
  ): Promise<AuthApiResponse> {
    return await this.usersService.login(
      user.username,
      user.password,
      transaction,
    );
  }
}
