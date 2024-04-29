import { User } from '@domain/models';
import { Inject, Service } from 'typedi';
import { UserEntity } from '../../entities';
import InjectionTokens from '../../infra/InjectionTokens';
import type { Repository, UserCreateInput } from '@interfaces';

@Service()
export default class UserService {
  constructor(
    @Inject(InjectionTokens.UserRepository)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    const users = await this.userRepository.findAll();
    return UserEntity.fromUsers(users);
  }

  async create(input: UserCreateInput): Promise<void> {
    const { username, password, nickname } = input;
    const user = User.create({ username, password, nickname });
    await this.userRepository.create(user);
  }
}
