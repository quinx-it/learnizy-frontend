export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
    GUEST = 'GUEST',
}

export interface User {
    userName: string
    role: UserRole
}

export interface DecodedToken {
    user: User | null
}

export interface AuthState extends DecodedToken {
    accessToken: string | null
}