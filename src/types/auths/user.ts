import { IUser } from './models';

export type GetUserResponse = IUser;

export interface UpdateUserRequest {
  companyName?: string;
  image?: File;
}

export type UpdateUserResponse = IUser;
