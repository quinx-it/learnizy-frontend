export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
    GUEST = 'GUEST',
}

export interface DecodedToken {
  userName: string | null
  role: UserRole
}

export interface AuthState extends DecodedToken {
    accessToken: string | null
}