import { ROUTES } from '@/const';

import { type ExploreItemType } from './typings';

export const exploreItems: ExploreItemType[] = [
  {
    route: ROUTES.USER_COURSES,
    titleKey: 'NAVBAR.COURSES',
    textKey: 'LANDING.EXPLORE.COURSES_TEXT',
  },
  {
    route: ROUTES.USER_MODULES,
    titleKey: 'NAVBAR.MODULES',
    textKey: 'LANDING.EXPLORE.MODULES_TEXT',
  },
  {
    route: ROUTES.USER_AI_ASSISTANT,
    titleKey: 'NAVBAR.AI_ASSISTANT',
    textKey: 'LANDING.EXPLORE.AI_ASSISTANT_TEXT',
  },
  {
    route: ROUTES.USER_EXAMS,
    titleKey: 'NAVBAR.EXAMS',
    textKey: 'LANDING.EXPLORE.EXAMS_TEXT',
  },
  {
    route: ROUTES.USER_KNOWLEDGE_BASE,
    titleKey: 'NAVBAR.KNOWLEDGE_BASE',
    textKey: 'LANDING.EXPLORE.KNOWLEDGE_BASE_TEXT',
  },
  {
    route: ROUTES.USER_PROJECTS,
    titleKey: 'NAVBAR.PROJECTS',
    textKey: 'LANDING.EXPLORE.PROJECTS_TEXT',
  },
];
