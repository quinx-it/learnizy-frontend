import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function pluralize(count: number, one: string, few: string, many: string): string {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod10 === 1 && mod100 !== 11) {
    return `${count} ${one}`;
  }
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) {
    return `${count} ${few}`;
  }
  return `${count} ${many}`;
}

export const normalizeToFive = (value: number): number => {
  if (value <= 0) return 0;
  if (value >= 100) return 5;
  return +((value / 100) * 5).toFixed(2);
};

import { jwtDecode } from 'jwt-decode';
import { DecodedToken, UserRole } from '@/store/slices/auth/types';
import {
  dynamicMentorRoutes,
  dynamicUserRoutes,
  publicRoutes,
  staticMentorRoutes,
  staticUserRoutes,
} from '../constants/routes';

interface DecodedTokenPayload {
  role: UserRole;
  sub: string;
}

export const decodeToken = (token: string): DecodedToken => {
  const data = jwtDecode<DecodedTokenPayload>(token);
  return { user: { userName: data.sub, role: data.role } };
};

export const isMentor = (role: UserRole) => {
  return role === UserRole.MENTOR;
};
export const isUser = (role: UserRole) => {
  return role === UserRole.USER;
};
export const isGuest = (role: UserRole) => {
  return role === UserRole.GUEST;
};

export function isMentorRoute(pathname: string) {
  return (
    staticMentorRoutes.includes(pathname) || dynamicMentorRoutes.some((rx) => rx.test(pathname))
  );
}

export function isUserRoute(pathname: string) {
  return staticUserRoutes.includes(pathname) || dynamicUserRoutes.some((rx) => rx.test(pathname));
}

export function isPublicRoute(pathname: string) {
  return publicRoutes.includes(pathname);
}

export function isRoleRoute(role: UserRole | undefined, pathname: string) {
  if (!role) return false;
  switch (role) {
    case UserRole.GUEST:
      return isPublicRoute(pathname);
    case UserRole.USER:
      return isUserRoute(pathname);
    case UserRole.MENTOR:
      return isMentorRoute(pathname);
  }
}

export function percentage(total: number, completed: number) {
  return total > 0 ? Math.round((completed / total) * 100) : 0;
}
