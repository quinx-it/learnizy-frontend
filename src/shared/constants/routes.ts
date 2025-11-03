import { UserRole } from '@/store/slices/auth/typings';

export const routes = {
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

export const publicRoutes = Object.values(routes.public);

export const staticUserRoutes = Object.values(routes.user);
export const dynamicUserRoutes = [
  /^\/learn\/modules\/\d+$/,
  /^\/learn\/modules\/\d+\/\d+$/,
  /^\/learn\/modules\/\d+\/\d+\/test$/,
  /^\/learn\/modules\/\d+\/\d+\/result$/,
  /^\/learn\/modules\/\d+\/\d+\/retelling$/,
  /^\/learn\/exams\/\d+\/\d+\/test$/,
  /^\/learn\/exams\/\d+\/\d+\/result$/,
  /^\/learn\/aiAssistant\/chat\/[^/]+$/,
];

export const staticMentorRoutes = Object.values(routes.mentor);

export const dynamicMentorRoutes = [
  /^\/mentor\/students\/\d+$/,
  /^\/mentor\/modules\/\d+$/,
  /^\/mentor\/modules\/\d+\/\d+$/,
  /^\/mentor\/modules\/\d+\/\d+\/test$/,
  /^\/mentor\/modules\/\d+\/\d+\/result$/,
  /^\/mentor\/modules\/\d+\/\d+\/retelling$/,
];

export const loginPageUrl = routes.public.loginPage;

export const defaultPage: Record<UserRole, string> = {
  [UserRole.GUEST]: routes.public.loginPage,
  [UserRole.USER]: routes.user.homePage,
  [UserRole.MENTOR]: routes.mentor.students,
};
