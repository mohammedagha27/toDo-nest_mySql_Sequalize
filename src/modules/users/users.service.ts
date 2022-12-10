import {
  Injectable,
  Inject,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { User } from './user.model';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './dto/user.dto';
import {
  ADMIN_ROLE,
  BAD_LOGIN_MSG,
  USER_REPOSITORY,
} from 'src/common/constants';
import { checkPassword, hashPassword } from 'src/common/utils';
import { Transaction } from 'sequelize';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    private readonly jwtService: JwtService,
  ) {}

  async create(UserDto: UserDto, transaction: Transaction): Promise<any> {
    const res = await this.findUserByUserName(UserDto.username, transaction);
    if (res)
      throw new ConflictException(
        `User with username ${UserDto.username} already exists`,
      );

    const hashedPassword = await hashPassword(UserDto.password);
    const user = {
      username: UserDto.username,
      password: hashedPassword,
      role: ADMIN_ROLE,
    };

    const createdUser = await this.userRepository.create<User>(user, {
      transaction,
    });

    const { password, role, ...resData } = createdUser.dataValues;

    const token = this.jwtService.sign({
      resData,
      role,
    });
    return {
      ...resData,
      token,
    };
  }

  async login(
    username: string,
    enteredPassword: string,
    transaction: Transaction,
  ): Promise<any> {
    const user = await this.findUserByUserName(username, transaction);

    if (!user) throw new BadRequestException(BAD_LOGIN_MSG);

    const { password, role, ...resData } = user.dataValues;
    const checkPass = await checkPassword(enteredPassword, password);

    if (!checkPass) throw new BadRequestException(BAD_LOGIN_MSG);

    const token = this.jwtService.sign({
      ...resData,
      role,
    });

    return { token, ...resData };
  }

  async findUserByUserName(
    username: string,
    transaction?: Transaction,
  ): Promise<User> {
    return await this.userRepository.findOne({
      where: { username },
      transaction,
    });
  }
}
