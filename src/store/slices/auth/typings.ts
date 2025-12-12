import { type Action } from '@reduxjs/toolkit';

export const enum UserRole {
  Mentor = 'ADMIN',
  User = 'USER',
  Guest = 'GUEST',
}

export interface IUser {
  userName: string;
  role: UserRole;
}

export interface IDecodedToken {
  user: IUser | null;
}

export interface IAuthState extends IDecodedToken {
  accessToken: string | null;
}

export interface IRehydrateAction extends Action<'persist/REHYDRATE'> {
  payload?: {
    accessToken?: string;
  };
}
