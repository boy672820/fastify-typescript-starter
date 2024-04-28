import { HydratedDocument, Schema, model } from 'mongoose';
import type { User } from '@interfaces';

export type UserDocument = HydratedDocument<User>;

export const roles = ['ADMIN', 'MEMBER', 'GUEST'] as const;

export const userSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  nickname: {
    type: String,
    required: false,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    enum: roles,
  },
  createdDate: {
    type: Date,
    required: true,
  },
  updatedDate: {
    type: Date,
    required: true,
  },
});

const User = model<UserDocument>('User', userSchema);

export default User;
