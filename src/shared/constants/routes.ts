export const routes = {
    public: {
        landingPage: '/',
        loginPage: '/login',
        forgotPassword: '/forgot-password',
        resetPassword: '/reset-password',
        userAgreement: '#',
        privacyPolicy: '#',
    },
    user: {
        homePage: '/learn',
        exams: '/learn/exams',
        knowlegeBase: '/learn/knowledge-base',
        frequentlyAskedQuestions: '/learn/knowledge-base/faq',
        modules: '/learn/modules',
        lessons: '/learn/modules/lessons',
        projects: '/learn/projects',
        userProfilePersonalData: '/learn/user-profile/personal-data',
        userProfileSecuritySettings: '/learn/user-profile/security-settings',

        interviewQuestions: '#',
        interviewRecords: '#'
    },
    mentor: {
        students: '/mentor/students',
    },
};

export const publicRoutes = Object.values(routes.public);
export const userRoutes = Object.values(routes.user);
export const mentorRoutes = Object.values(routes.mentor);
