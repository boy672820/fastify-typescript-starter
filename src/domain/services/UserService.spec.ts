import { User } from '@domain/models';
import { mock, MockProxy } from 'jest-mock-extended';
import { UserRepository } from '../repositories';
import UserService from './UserService';

describe('UserService', () => {
  let userRepository: MockProxy<UserRepository>;
  let userService: UserService;

  beforeEach(() => {
    userRepository = mock<UserRepository>();
    userService = new UserService(userRepository);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      userRepository.findAll.mockResolvedValueOnce([]);

      await expect(userService.findAll()).resolves.toEqual([]);
    });
  });

  it('should create a user', async () => {
    const input = {
      username: 'test',
      password: 'Test@123',
      nickname: 'Tester',
    };
    const user = User.create(input);
    jest.spyOn(User, 'create').mockReturnValue(user);

    await expect(userService.create(input)).resolves.toBeUndefined();

    expect(userRepository.create).toHaveBeenCalledWith(user);
  });
});
