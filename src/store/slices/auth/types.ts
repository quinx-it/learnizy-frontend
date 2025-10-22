export enum UserRole {
  MENTOR = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST',
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
