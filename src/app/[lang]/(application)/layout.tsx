'use client';

import { type PropsWithChildren, useEffect, type FC } from 'react';

import { useRefreshMutation } from '@/api/endpoints/auth';
import FullscreenLoader from '@/components/FullscreenLoader';
import NotFoundPage from '@/components/NotFoundPage';
import { ROUTES } from '@/const/routes';
import { useRouter, usePathname } from '@/hooks';
import { useAppSelector } from '@/hooks/redux';
import { isRoleRoute } from '@/lib/utils';
import { selectToken, selectUserRole } from '@/store/slices/auth/selectors';
import { UserRole } from '@/store/slices/auth/typings';

const PUBLIC_ROUTES = [
  ROUTES.LANDING_PAGE,
  ROUTES.LOGIN_PAGE,
  ROUTES.REGISTER_PAGE,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.RESET_PASSWORD,
  ROUTES.USER_AGREEMENT,
  ROUTES.PRIVACY_POLICY,
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

const allStaticRoutes = [...PUBLIC_ROUTES, ...STATIC_USER_ROUTES, ...STATIC_MENTOR_ROUTES];
const allDynamicRoutes = [...DYNAMIC_USER_ROUTES, ...DYNAMIC_MENTOR_ROUTES];

const getDefaultPage = (role: UserRole): string => {
  switch (role) {
    case UserRole.Guest:
      return ROUTES.LOGIN_PAGE;
    case UserRole.User:
      return ROUTES.USER_HOME_PAGE;
    case UserRole.Mentor:
      return ROUTES.MENTOR_STUDENTS;
    default:
      return ROUTES.LOGIN_PAGE;
  }
};

const isValidRoute = (pathname: ROUTES) => {
  if (allStaticRoutes.includes(pathname)) return true;

  return allDynamicRoutes.some((regex) => regex.test(pathname));
};

const ApplicationLayout: FC<PropsWithChildren> = (props) => {
  const { children } = props;

  const [refreshAccessToken, { isLoading, isUninitialized }] = useRefreshMutation();
  const pathname = usePathname();
  const router = useRouter();
  const accessToken = useAppSelector(selectToken);
  const role = useAppSelector(selectUserRole);

  const isPublicRoute = PUBLIC_ROUTES.includes(pathname as ROUTES);
  const isRestoringSession = !isPublicRoute && (isUninitialized || isLoading);

  useEffect(() => {
    if (isPublicRoute) return;

    refreshAccessToken();
  }, [refreshAccessToken, isPublicRoute]);

  useEffect(() => {
    if (isRestoringSession) return;

    if (!accessToken && !isPublicRoute) {
      router.replace(ROUTES.LOGIN_PAGE);

      return;
    }

    if (role && pathname === ROUTES.LOGIN_PAGE && getDefaultPage(role) !== ROUTES.LOGIN_PAGE) {
      router.replace(getDefaultPage(role));

      return;
    }

    if (role && !isRoleRoute(role, pathname)) {
      if (isValidRoute(pathname as ROUTES)) {
        router.replace(getDefaultPage(role));
      }
    }
  }, [accessToken, pathname, router, isRestoringSession, isPublicRoute, role]);

  if (isRestoringSession) return <FullscreenLoader />;

  const isLeavingLoginPage =
    !!role && pathname === ROUTES.LOGIN_PAGE && getDefaultPage(role) !== ROUTES.LOGIN_PAGE;

  if (role && (!isRoleRoute(role, pathname) || isLeavingLoginPage)) return <FullscreenLoader />;

  if (!isValidRoute(pathname as ROUTES)) return <NotFoundPage />;

  return children;
};

export default ApplicationLayout;
