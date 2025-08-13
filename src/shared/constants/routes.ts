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
  modules: '/learn/modules',
  projects: '/learn/projects',
  userProfilePersonalData: '/learn/user-profile/personal-data',
  userProfileSecuritySettings: '/learn/user-profile/security-settings',

  modulesMainLabel: 'Структура обучения',
  modulesLabel: 'Модули',
  moduleLabel: 'Модуль',
  lessonLabel: 'Урок',
  examsLabel: 'Экзамены',
  casesLabel: 'Кейсы',
  knowlegeBaseLabel: 'База знаний',
  faqLabel: 'FAQ',
  interviewLabel: 'Вопросы для собеседования',
};

export const publicRoutes = [routes.loginPage, routes.forgotPassword, routes.resetPassword, routes.landingPage];
