export const routes = {
  landingPage: '/',
  loginPage: '/login',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  userAgreement: '#',
  privacyPolicy: '#',

  homePage: '/learn',
  exams: '/learn/exams',
  knowlegeBase: '/learn/knowledge-base',
  faq: '/learn/knowledge-base/faq',
  modules: '/learn/modules',
  projects: '/learn/projects',
  userProfilePersonalData: '/learn/user-profile/personal-data',
  userProfileSecuritySettings: '/learn/user-profile/security-settings',
};

export const publicRoutes = [routes.loginPage, routes.forgotPassword, routes.resetPassword, routes.landingPage];
