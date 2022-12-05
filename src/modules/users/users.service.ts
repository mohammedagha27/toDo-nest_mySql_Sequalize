import {
  Injectable,
  Inject,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Task } from '../tasks/task.entity';
import { TasksService } from '../tasks/tasks.service';
import { ApiResponse } from 'src/common/interfaces';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_REPOSITORY') private readonly userRepository: typeof User,
    private readonly tasksService: TasksService,
    private readonly jwtService: JwtService,
  ) {}

  async create(
    newUsername: string,
    hashedPassword: string,
  ): Promise<ApiResponse> {
    const res = await this.userRepository.findOne({
      where: { username: newUsername },
    });
    if (res)
      throw new ConflictException(
        `User with username ${newUsername} already exists`,
      );
    const user = { username: newUsername, password: hashedPassword };
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

  async login(username: string, password: string): Promise<ApiResponse> {
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
