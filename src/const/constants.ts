import { routes } from '@/const';

export const globalConstants = {
  rootBreadcrumbLabels: {
    modulesMainLabel: 'BREADCRUMB_LABELS.MODULES_MAIN_LABEL',
    modulesLabel: 'BREADCRUMB_LABELS.MODULES_LABEL',
    moduleLabel: 'BREADCRUMB_LABELS.MODULE_LABEL',
    lessonLabel: 'BREADCRUMB_LABELS.LESSON_LABEL',
    retellingLabel: 'BREADCRUMB_LABELS.RETELLING_LABEL',
    examsLabel: 'BREADCRUMB_LABELS.EXAMS_LABEL',
    casesLabel: 'BREADCRUMB_LABELS.CASES_LABEL',
    knowlegeBaseLabel: 'BREADCRUMB_LABELS.KNOWLEGE_BASE_LABEL',
    faqLabel: 'BREADCRUMB_LABELS.FAQ_LABEL',
    interviewLabel: 'BREADCRUMB_LABELS.INTERVIEW_LABEL',
  },
};

export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
}

export const REFRESH_THROTTLE = 1000;

export const navbarLinks = {
  user: [
    { href: routes.user.homePage, src: '/images/cubes-main-icon.svg', label: 'NAVBAR.HOME' },
    { href: routes.user.modules, src: '/images/student-hat-icon.svg', label: 'NAVBAR.MODULES' },
    {
      href: routes.user.aiAssistant,
      src: '/images/four-pointed-star-icon.svg',
      label: 'NAVBAR.AI_ASSISTANT',
    },
    {
      href: routes.user.knowlegeBase,
      src: '/images/discussion-icon.svg',
      label: 'NAVBAR.KNOWLEDGE_BASE',
    },
    { href: routes.user.exams, src: '/images/a-plus-icon.svg', label: 'NAVBAR.EXAMS' },
    { href: routes.user.projects, src: '/images/projects-icon.svg', label: 'NAVBAR.PROJECTS' },
    {
      href: routes.user.userProfilePersonalData,
      src: '/images/person-icon.svg',
      label: 'NAVBAR.PROFILE',
    },
  ],
  mentor: [
    { href: routes.mentor.students, src: '/images/student-hat-icon.svg', label: 'NAVBAR.HOME' },
    {
      href: routes.mentor.modules,
      src: '/images/student-hat-icon.svg',
      label: 'NAVBAR.MODULES',
    },
  ],
};
