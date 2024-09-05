import { User } from '../models';

export default interface UserRepository {
  findAll(): Promise<User[]>;
  create(user: User): Promise<void>;
}
