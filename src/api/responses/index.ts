import UserResponse from './UserResponse';
import { usersResponseSchema, userCreateResponseSchema } from './UserResponse';

const schemas = {
  users: usersResponseSchema,
  userCreate: userCreateResponseSchema,
};

export { UserResponse, schemas };
