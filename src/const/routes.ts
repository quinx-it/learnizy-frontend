import { UserRole } from '@/store/slices/auth/typings';

export const ROUTES = {
  public: {
    landingPage: '/',
    loginPage: '/login',
    registerPage: '/register',
    forgotPassword: '/forgotPassword',
    resetPassword: '/resetPassword',
    userAgreement: '#',
    privacyPolicy: '#',
  },
  user: {
    homePage: '/learn',
    exams: '/learn/exams',
    knowlegeBase: '/learn/knowledgeBase',
    aiAssistant: '/learn/aiAssistant',
    frequentlyAskedQuestions: '/404',
    modules: '/learn/modules',
    projects: '/learn/projects',
    userProfilePersonalData: '/learn/userProfile/personalData',
    userProfileSecuritySettings: '/learn/userProfile/securitySettings',
    interviewQuestions: '/404',
    interviewRecords: '/404',
  },
  mentor: {
    students: '/mentor/students',
    modules: '/mentor/modules',
  },
};

export const PUBLIC_ROUTES = Object.values(ROUTES.public);

export const STATIC_USER_ROUTES = Object.values(ROUTES.user);
export const DYNAMIC_USER_ROUTES = [
  /^\/learn\/modules\/\d+$/,
  /^\/learn\/modules\/\d+\/\d+$/,
  /^\/learn\/modules\/\d+\/\d+\/test$/,
  /^\/learn\/modules\/\d+\/\d+\/result$/,
  /^\/learn\/modules\/\d+\/\d+\/retelling$/,
  /^\/learn\/exams\/\d+\/\d+\/test$/,
  /^\/learn\/exams\/\d+\/\d+\/result$/,
  /^\/learn\/aiAssistant\/chat\/[^/]+$/,
];

export const STATIC_MENTOR_ROUTES = Object.values(ROUTES.mentor);

export const DYNAMIC_MENTOR_ROUTES = [
  /^\/mentor\/students\/\d+$/,
  /^\/mentor\/modules\/\d+$/,
  /^\/mentor\/modules\/\d+\/\d+$/,
  /^\/mentor\/modules\/\d+\/\d+\/test$/,
  /^\/mentor\/modules\/\d+\/\d+\/result$/,
  /^\/mentor\/modules\/\d+\/\d+\/retelling$/,
];

export const LOGIN_PAGE_URL = ROUTES.public.loginPage;

export const DEFAULT_PAGE: Record<UserRole, string> = {
  [UserRole.Guest]: ROUTES.public.loginPage,
  [UserRole.User]: ROUTES.user.homePage,
  [UserRole.Mentor]: ROUTES.mentor.students,
};
