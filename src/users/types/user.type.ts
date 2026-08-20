import { User } from '../entitys/user.entity';

export type SanitizedUser = Omit<User, 'password'>;
