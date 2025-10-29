import { UserRole } from '@/store/slices/auth/typings';

export interface IDecodedTokenPayload {
  role: UserRole;
  sub: string;
}
