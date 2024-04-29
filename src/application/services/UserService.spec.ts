import { User } from '@domain/models';
import Container from 'typedi';
import { mockDeep } from 'jest-mock-extended';
import UserService from './UserService';
import type { Repository, UserCreateInput } from '@interfaces';
import InjectionTokens from '../../infra/InjectionTokens';

const userRepositoryMock = mockDeep<Repository<User>>();

describe('UserService', () => {
  let userService: UserService;

  beforeEach(() => {
    Container.set(InjectionTokens.UserRepository, userRepositoryMock);
    userService = Container.get(UserService);
  });

  afterEach(() => {
    Container.reset();
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      userRepositoryMock.findAll.mockResolvedValueOnce([]);

      await expect(userService.findAll()).resolves.toEqual([]);
    });
  });

  it('should create a user', async () => {
    const input: UserCreateInput = {
      username: 'test',
      password: 'Test@123',
      nickname: 'Tester',
    };
    const user = User.create(input);
    jest.spyOn(User, 'create').mockReturnValue(user);

    await expect(userService.create(input)).resolves.toBeUndefined();

    expect(userRepositoryMock.create).toHaveBeenCalledWith(user);
  });
});
