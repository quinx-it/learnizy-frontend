import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { jwtDecode } from 'jwt-decode';
import { IDecodedToken, UserRole } from '@/store/slices/auth/typings';
import {
  dynamicMentorRoutes,
  dynamicUserRoutes,
  publicRoutes,
  staticMentorRoutes,
  staticUserRoutes,
} from '../constants/routes';
import { IDecodedTokenPayload } from './typings';

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

export const decodeToken = (token: string): IDecodedToken => {
  const data = jwtDecode<IDecodedTokenPayload>(token);
  console.log(' JWT decoded role from backend:', data.role);
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

export const isAudioUrl = (value: string): boolean => {
  try {
    const url = new URL(value);
    return ['http:', 'https:', 'blob:'].includes(url.protocol);
  } catch {
    return false;
  }
};

export const formatRelativeDate = (date: Date): string => {
  const pluralize = (count: number, words: [string, string, string]): string => {
    const cases = [2, 0, 1, 1, 1, 2];
    const index = count % 100 > 4 && count % 100 < 20 ? 2 : cases[Math.min(count % 10, 5)];
    return words[index];
  };

  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const chatDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const diffTime = today.getTime() - chatDate.getTime();
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Сегодня';

  if (diffDays === 1) return 'Вчера';

  if (diffDays <= 7) {
    return `${diffDays} ${pluralize(diffDays, ['день', 'дня', 'дней'])} назад`;
  }

  const weeks = Math.floor(diffDays / 7);
  if (diffDays <= 30) {
    return `${weeks} ${pluralize(weeks, ['неделю', 'недели', 'недель'])} назад`;
  }

  const months = Math.floor(diffDays / 30);
  if (diffDays <= 365) {
    return `${months} ${pluralize(months, ['месяц', 'месяца', 'месяцев'])} назад`;
  }

  const years = Math.floor(diffDays / 365);
  return `${years} ${pluralize(years, ['год', 'года', 'лет'])} назад`;
};
