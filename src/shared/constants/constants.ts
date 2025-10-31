export const globalConstants = {
  rootBreadcrumbLabels: {
    modulesMainLabel: 'Структура обучения',
    modulesLabel: 'Модули',
    moduleLabel: 'Модуль',
    lessonLabel: 'Урок',
    retellingLabel: 'Личный ИИ-помощник',
    examsLabel: 'Экзамены',
    casesLabel: 'Кейсы',
    knowlegeBaseLabel: 'База знаний',
    faqLabel: 'FAQ',
    interviewLabel: 'Вопросы для собеседования',
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
    { href: routes.user.homePage, Icon: CubesMainIcon, label: 'Главная' },
    { href: routes.user.modules, Icon: StudentHatIcon, label: 'Модули' },
    { href: routes.user.aiAssistant, Icon: FourPointedStarIcon, label: 'ИИ-ассистент' },
    { href: routes.user.knowlegeBase, Icon: DiscussionIcon, label: 'База знаний' },
    { href: routes.user.exams, Icon: APlusIcon, label: 'Экзамены' },
    { href: routes.user.projects, Icon: ProjectsIcon, label: 'Проекты' },
    { href: routes.user.userProfilePersonalData, Icon: PersonIcon, label: 'Профиль' },
  ],
  mentor: [
    { href: routes.mentor.students, Icon: StudentHatIcon, label: 'Главная' },
    { href: routes.mentor.modules, Icon: StudentHatIcon, label: 'Модули' },
  ],
};
