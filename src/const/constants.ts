import { ROUTES } from '@/const/routes';

export const GLOBAL_CONSTANTS = {
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

export const enum HttpStatus {
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

export const NAVBAR_LINKS = {
  user: [
    { href: ROUTES.user.homePage, src: '/images/cubes-main-icon.svg', label: 'NAVBAR.HOME' },
    { href: ROUTES.user.modules, src: '/images/student-hat-icon.svg', label: 'NAVBAR.MODULES' },
    {
      href: ROUTES.user.aiAssistant,
      src: '/images/four-pointed-star-icon.svg',
      label: 'NAVBAR.AI_ASSISTANT',
    },
    {
      href: ROUTES.user.knowlegeBase,
      src: '/images/discussion-icon.svg',
      label: 'NAVBAR.KNOWLEDGE_BASE',
    },
    { href: ROUTES.user.exams, src: '/images/a-plus-icon.svg', label: 'NAVBAR.EXAMS' },
    { href: ROUTES.user.projects, src: '/images/projects-icon.svg', label: 'NAVBAR.PROJECTS' },
    {
      href: ROUTES.user.userProfilePersonalData,
      src: '/images/person-icon.svg',
      label: 'NAVBAR.PROFILE',
    },
  ],
  mentor: [
    { href: ROUTES.mentor.students, src: '/images/student-hat-icon.svg', label: 'NAVBAR.HOME' },
    {
      href: ROUTES.mentor.modules,
      src: '/images/student-hat-icon.svg',
      label: 'NAVBAR.MODULES',
    },
  ],
};
