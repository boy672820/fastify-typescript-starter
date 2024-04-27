import { User } from '@domain/models';
import { Inject, Service } from 'typedi';
import InjectionTokens from '../infra/InjectionTokens';
import type { UserCreateInput } from '@interfaces';
import type { Repository } from '../infra/interfaces';

@Service()
export default class UserService {
  constructor(
    @Inject(InjectionTokens.UserRepository)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return [];
  }

  async create(input: UserCreateInput): Promise<User> {
    const { username, password, nickname } = input;
    const user = User.create({ username, password, nickname });
    await this.userRepository.create(user);
    return user;
  }
}
