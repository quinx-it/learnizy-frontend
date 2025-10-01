import { UserRole } from "@/store/slices/auth/types";

export const routes = {
    public: {
        landingPage: '/',
        loginPage: '/login',
        registerPage: '/register',
        forgotPassword: '/forgot-password',
        resetPassword: '/reset-password',
        userAgreement: '#',
        privacyPolicy: '#',
    },
    user: {
        homePage: '/learn',
        exams: '/learn/exams',
        knowlegeBase: '/learn/knowledge-base',
        frequentlyAskedQuestions: '/404',
        modules: '/learn/modules',
        projects: '/learn/projects',
        userProfilePersonalData: '/learn/user-profile/personal-data',
        userProfileSecuritySettings: '/learn/user-profile/security-settings',

        interviewQuestions: '/404',
        interviewRecords: '/404'
    },
    mentor: {
        students: '/mentor/students',
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
]

export const staticMentorRoutes = Object.values(routes.mentor);
export const dynamicMentorRoutes = [
  /^\/mentor\/students\/\d+$/,                  
]


export const loginPageUrl = routes.public.loginPage;

export const defaultPage: Record<UserRole, string> = {
    [UserRole.GUEST]: routes.public.loginPage,
    [UserRole.USER]: routes.user.homePage,
    [UserRole.MENTOR]: routes.mentor.students,
};