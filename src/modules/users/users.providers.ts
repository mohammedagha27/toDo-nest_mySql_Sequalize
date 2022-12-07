import { USER_REPOSITORY } from 'src/common/constants';
import { User } from './user.model';

export const usersProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
