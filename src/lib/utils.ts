import { clsx, type ClassValue } from 'clsx';
import { jwtDecode } from 'jwt-decode';
import { twMerge } from 'tailwind-merge';

import { ROUTES } from '@/const/routes';
import { type IDecodedToken, UserRole } from '@/store/slices/auth/typings';
import { type TranslationFunctionType } from '@/types';

import { type IDecodedTokenPayload } from './typings';

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

  return { user: { userName: data.sub, role: data.role } };
};

export const isMentor = (role: UserRole) => {
  return role === UserRole.Mentor;
};
export const isUser = (role: UserRole) => {
  return role === UserRole.User;
};
export const isGuest = (role: UserRole) => {
  return role === UserRole.Guest;
};

const STATIC_MENTOR_ROUTES = [ROUTES.MENTOR_STUDENTS, ROUTES.MENTOR_MODULES, ROUTES.MENTOR_COURSES];
const DYNAMIC_MENTOR_ROUTES = [
  /^\/mentor\/students\/\d+$/,
  /^\/mentor\/modules\/\d+$/,
  /^\/mentor\/modules\/\d+\/\d+$/,
  /^\/mentor\/modules\/\d+\/\d+\/test$/,
  /^\/mentor\/modules\/\d+\/\d+\/result$/,
  /^\/mentor\/modules\/\d+\/\d+\/retelling$/,
  /^\/mentor\/courses\/\d+\/modules$/,
  /^\/mentor\/courses\/\d+\/modules\/\d+$/,
  /^\/mentor\/courses\/\d+\/modules\/\d+\/\d+$/,
  /^\/mentor\/courses\/\d+\/modules\/\d+\/\d+\/test$/,
  /^\/mentor\/courses\/\d+\/modules\/\d+\/\d+\/result$/,
  /^\/mentor\/courses\/\d+\/modules\/\d+\/\d+\/retelling$/,
];

const STATIC_USER_ROUTES = [
  ROUTES.USER_HOME_PAGE,
  ROUTES.USER_EXAMS,
  ROUTES.USER_KNOWLEDGE_BASE,
  ROUTES.USER_AI_ASSISTANT,
  ROUTES.USER_FREQUENTLY_ASKED_QUESTIONS,
  ROUTES.USER_MODULES,
  ROUTES.USER_COURSES,
  ROUTES.USER_PROJECTS,
  ROUTES.USER_PROFILE_PERSONAL_DATA,
  ROUTES.USER_PROFILE_SECURITY_SETTINGS,
  ROUTES.USER_INTERVIEW_QUESTIONS,
  ROUTES.USER_INTERVIEW_RECORDS,
];
const DYNAMIC_USER_ROUTES = [
  /^\/learn\/modules\/\d+$/,
  /^\/learn\/modules\/\d+\/\d+$/,
  /^\/learn\/modules\/\d+\/\d+\/test$/,
  /^\/learn\/modules\/\d+\/\d+\/result$/,
  /^\/learn\/modules\/\d+\/\d+\/retelling$/,
  /^\/learn\/courses\/\d+\/modules$/,
  /^\/learn\/courses\/\d+\/modules\/\d+$/,
  /^\/learn\/courses\/\d+\/modules\/\d+\/\d+$/,
  /^\/learn\/courses\/\d+\/modules\/\d+\/\d+\/test$/,
  /^\/learn\/courses\/\d+\/modules\/\d+\/\d+\/result$/,
  /^\/learn\/courses\/\d+\/modules\/\d+\/\d+\/retelling$/,
  /^\/learn\/exams\/\d+\/\d+\/test$/,
  /^\/learn\/exams\/\d+\/\d+\/result$/,
  /^\/learn\/aiAssistant\/chat\/[^/]+$/,
];

const PUBLIC_ROUTES = [
  ROUTES.LANDING_PAGE,
  ROUTES.LOGIN_PAGE,
  ROUTES.REGISTER_PAGE,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.RESET_PASSWORD,
  ROUTES.USER_AGREEMENT,
  ROUTES.PRIVACY_POLICY,
];

export function isMentorRoute(pathname: string) {
  return (
    STATIC_MENTOR_ROUTES.includes(pathname as ROUTES) ||
    DYNAMIC_MENTOR_ROUTES.some((rx) => rx.test(pathname))
  );
}

export function isUserRoute(pathname: string) {
  return (
    STATIC_USER_ROUTES.includes(pathname as ROUTES) ||
    DYNAMIC_USER_ROUTES.some((rx) => rx.test(pathname))
  );
}

export function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.includes(pathname as ROUTES);
}

export function isRoleRoute(role: UserRole | undefined, pathname: string) {
  if (!role) return false;

  switch (role) {
    case UserRole.Guest:
      return isPublicRoute(pathname);
    case UserRole.User:
      return isUserRoute(pathname);
    case UserRole.Mentor:
      return isMentorRoute(pathname);
    default:
      return false;
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

export const formatRelativeDate = (date: Date, t: TranslationFunctionType): string => {
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

  if (diffDays === 0) return t('TIME.TODAY');

  if (diffDays === 1) return t('TIME.YESTERDAY');

  if (diffDays <= 7) {
    return `${diffDays} ${pluralize(diffDays, [
      t('TIME.DAY_ONE'),
      t('TIME.DAY_TWO'),
      t('TIME.DAY_MANY'),
    ])} ${t('TIME.AGO')}`;
  }

  const weeks = Math.floor(diffDays / 7);

  if (diffDays <= 30) {
    return `${weeks} ${pluralize(weeks, [
      t('TIME.WEEK_ONE'),
      t('TIME.WEEK_TWO'),
      t('TIME.WEEK_MANY'),
    ])} ${t('TIME.AGO')}`;
  }

  const months = Math.floor(diffDays / 30);

  if (diffDays <= 365) {
    return `${months} ${pluralize(months, [
      t('TIME.MONTH_ONE'),
      t('TIME.MONTH_TWO'),
      t('TIME.MONTH_MANY'),
    ])} ${t('TIME.AGO')}`;
  }

  const years = Math.floor(diffDays / 365);

  return `${years} ${pluralize(years, [
    t('TIME.YEAR_ONE'),
    t('TIME.YEAR_TWO'),
    t('TIME.YEAR_MANY'),
  ])} ${t('TIME.AGO')}`;
};
