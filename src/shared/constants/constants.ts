import {
  ProjectsIcon,
  APlusIcon,
  CubesMainIcon,
  DiscussionIcon,
  PersonIcon,
  StudentHatIcon,
  FourPointedStarIcon,
} from '@/shared/ui/icons';
import { routes } from '@/shared/constants';

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

export enum Language {
  ru = 'ru',
}

export const DEFAULT_LANGUAGE = Language.ru;

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

import {
  ProjectsIcon,
  APlusIcon,
  CubesMainIcon,
  DiscussionIcon,
  PersonIcon,
  StudentHatIcon,
  FourPointedStarIcon,
} from '@/shared/ui/icons';
import { routes } from '@/shared/constants';

export const navbarLinks = {
  user: [
    { href: routes.user.homePage, Icon: CubesMainIcon, label: 'NAVBAR.HOME' },
    { href: routes.user.modules, Icon: StudentHatIcon, label: 'NAVBAR.MODULES' },
    { href: routes.user.aiAssistant, Icon: FourPointedStarIcon, label: 'NAVBAR.AI_ASSISTANT' },
    { href: routes.user.knowlegeBase, Icon: DiscussionIcon, label: 'NAVBAR.KNOWLEDGE_BASE' },
    { href: routes.user.exams, Icon: APlusIcon, label: 'NAVBAR.EXAMS' },
    { href: routes.user.projects, Icon: ProjectsIcon, label: 'NAVBAR.PROJECTS' },
    { href: routes.user.userProfilePersonalData, Icon: PersonIcon, label: 'NAVBAR.PROFILE' },
  ],
  mentor: [
    { href: routes.mentor.students, Icon: StudentHatIcon, label: 'NAVBAR.HOME' },
    { href: routes.mentor.modules, Icon: StudentHatIcon, label: 'NAVBAR.MODULES' },
  ],
};
