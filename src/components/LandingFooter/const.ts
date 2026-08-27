import { ROUTES } from '@/const';

type FooterLinkType = {
  route: ROUTES;
  labelKey: string;
};

export const learnLinks: FooterLinkType[] = [
  { route: ROUTES.USER_COURSES, labelKey: 'NAVBAR.COURSES' },
  { route: ROUTES.USER_MODULES, labelKey: 'NAVBAR.MODULES' },
  { route: ROUTES.USER_AI_ASSISTANT, labelKey: 'NAVBAR.AI_ASSISTANT' },
  { route: ROUTES.USER_EXAMS, labelKey: 'NAVBAR.EXAMS' },
  { route: ROUTES.USER_KNOWLEDGE_BASE, labelKey: 'NAVBAR.KNOWLEDGE_BASE' },
  { route: ROUTES.USER_PROJECTS, labelKey: 'NAVBAR.PROJECTS' },
];

export const accountLinks: FooterLinkType[] = [
  { route: ROUTES.LOGIN_PAGE, labelKey: 'LANDING.FOOTER.SIGN_IN' },
  { route: ROUTES.REGISTER_PAGE, labelKey: 'LANDING.FOOTER.SIGN_UP' },
  { route: ROUTES.FORGOT_PASSWORD, labelKey: 'LANDING.FOOTER.FORGOT_PASSWORD' },
];
