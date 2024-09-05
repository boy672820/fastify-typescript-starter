import { User } from '@domain/models';
import { Inject, Service } from 'typedi';
import { UserRepository } from '../repositories';
import InjectionTokens from '../../infra/InjectionTokens';

@Service()
export default class UserService {
  constructor(
    @Inject(InjectionTokens.UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    return users;
  }

  async create(input: {
    username: string;
    password: string;
    nickname: string;
  }): Promise<void> {
    const { username, password, nickname } = input;
    const user = User.create({ username, password, nickname });
    await this.userRepository.create(user);
  }
}
