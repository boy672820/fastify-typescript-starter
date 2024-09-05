import { Inject, Service } from 'typedi';
import { UserService } from '../../domain/services';
import { User } from '../../domain/models';

@Service()
export default class FindAllUsersUseCase {
  constructor(@Inject() private readonly userService: UserService) {}

  async execute(): Promise<User[]> {
    const users = await this.userService.findAll();
    return users;
  }
}
