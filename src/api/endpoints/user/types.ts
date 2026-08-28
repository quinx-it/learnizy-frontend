export type GenderType = 'MALE' | 'FEMALE';

export type UserRoleType = 'USER' | 'ADMIN';

export interface ICurrentUserResponse {
  id: number;
  username: string;
  email: string;
  role: UserRoleType;
  createdAt: string;
  firstName: string | null;
  lastName: string | null;
  gender: GenderType | null;
  phone: string | null;
  address: string | null;
  birthDate: string | null;
  country: string | null;
  city: string | null;
  avatarKey: string | null;
}

export interface IUpdateProfileRequest {
  email?: string;
  firstName?: string;
  lastName?: string;
  gender?: GenderType;
  phone?: string;
  address?: string;
  birthDate?: string;
  country?: string;
  city?: string;
  avatarKey?: string;
}

export interface IFileUploadResponse {
  message: string;
  downloadUrl: string;
  originalFilename: string;
  contentType: string;
  size: number;
}
