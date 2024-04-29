import { User as UserDomain } from '@domain/models';
import { LocalDateTime, ObjectId, Role } from '@lib/types';
import Container from 'typedi';
import { mockDeep } from 'jest-mock-extended';
import mongoose, { Model } from 'mongoose';
import User, { UserDocument } from '../models/User';
import InjectionTokens from '../InjectionTokens';
import UserRepository from './UserRepository';

// 종속성 주입을 위해 UserRepository를 Container에 등록합니다.
UserRepository;

const userModelMock = mockDeep<Model<UserDocument>>();

describe('UserRepository', () => {
  let userRepository: UserRepository;

  beforeEach(() => {
    Container.set(User.name, userModelMock);
    userRepository = Container.get(InjectionTokens.UserRepository);
  });

  afterEach(() => {
    Container.reset();
  });

  it('should be defined', () => {
    expect(userRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      userModelMock.find.mockResolvedValueOnce([]);

      await expect(userRepository.findAll()).resolves.toEqual([]);
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      const newUser = UserDomain.create({
        username: 'test',
        password: 'Test@123',
        nickname: 'Tester',
      });

      await expect(userRepository.create(newUser)).resolves.toBeUndefined();

      expect(userModelMock.create).toHaveBeenCalledWith({
        _id: newUser.id.getObjectId(),
        username: newUser.username,
        password: newUser.password,
        nickname: newUser.nickname,
        role: newUser.role,
        createdDate: newUser.createdDate.toNative(),
        updatedDate: newUser.updatedDate.toNative(),
      });
    });
  });

  describe('toModel', () => {
    it('should convert a model to a domain', () => {
      const userDocument = {
        _id: new mongoose.Types.ObjectId(),
        username: 'test',
        password: 'Test@123',
        nickname: 'Tester',
        role: Role.Guest,
        createdDate: new Date(),
        updatedDate: new Date(),
      } as UserDocument;
      const spyOnFrom = jest.spyOn(UserDomain, 'from');

      expect(userRepository.toModel(userDocument)).toBeInstanceOf(UserDomain);
      expect(spyOnFrom).toHaveBeenCalledWith({
        id: expect.any(ObjectId),
        username: userDocument.username,
        password: userDocument.password,
        nickname: userDocument.nickname,
        role: userDocument.role,
        createdDate: expect.any(LocalDateTime),
        updatedDate: expect.any(LocalDateTime),
      });
    });
  });
});
