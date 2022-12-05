import {
  Injectable,
  Inject,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { User } from './user.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Task } from '../tasks/task.model';
import { TasksService } from '../tasks/tasks.service';
import { AuthApiResponse } from './interfaces';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from 'src/common/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    private readonly tasksService: TasksService,
    private readonly jwtService: JwtService,
  ) {}

  async create(UserDto: UserDto): Promise<AuthApiResponse> {
    const hashedPassword = await bcrypt.hash(UserDto.password, 10);
    const res = await this.userRepository.findOne({
      where: { username: UserDto.username },
    });
    if (res)
      throw new ConflictException(
        `User with username ${UserDto.username} already exists`,
      );
    const user = { username: UserDto.username, password: hashedPassword };
    const { id, username, createdAt, updatedAt } =
      await this.userRepository.create<User>(user);
    const token = this.jwtService.sign({ sub: user.username });
    return {
      id,
      username,
      createdAt,
      updatedAt,
      token,
    };
  }

  async login(username: string, password: string): Promise<AuthApiResponse> {
    const user = await this.userRepository.findOne<User>({
      where: { username },
    });
    if (!user)
      throw new BadRequestException('username or password is incorrect');
    const { createdAt, updatedAt, id } = user;
    const checkPass = await bcrypt.compare(password, user.password);
    if (!checkPass)
      throw new BadRequestException('username or password is incorrect');
    const token = this.jwtService.sign({ sub: user.username });
    return { token, createdAt, updatedAt, id, username };
  }
  async allTasks(id: number): Promise<Task[]> {
    const data = await this.tasksService.findAllWhere({
      where: { userId: id },
    });
    return data;
  }
}
