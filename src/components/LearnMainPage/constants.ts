import { AccordionItemType } from '@/components/AccordionReview/typings';
import { CourseListItemType } from '@/components/CourseListItem/typings';

export enum ModuleStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  BLOCKED = 'BLOCKED',
}

export const constants = {
  titles: {
    currentCourse: 'LEARN_MAIN_PAGE.TITLES.CURRENT_COURSE',
    currentModule: 'LEARN_MAIN_PAGE.TITLES.CURRENT_MODULE',
    courseName: 'LEARN_MAIN_PAGE.TITLES.COURSE_NAME',
    moduleName: 'LEARN_MAIN_PAGE.TITLES.MODULE_NAME',
    review: 'LEARN_MAIN_PAGE.TITLES.REVIEW',
    statistics: 'LEARN_MAIN_PAGE.TITLES.STATISTICS',
  },
  statuses: {
    [ModuleStatus.NOT_STARTED]: 'LEARN_MAIN_PAGE.STATUSES.NOT_STARTED',
    [ModuleStatus.IN_PROGRESS]: 'LEARN_MAIN_PAGE.STATUSES.IN_PROGRESS',
    [ModuleStatus.COMPLETED]: 'LEARN_MAIN_PAGE.STATUSES.COMPLETED',
    [ModuleStatus.BLOCKED]: 'LEARN_MAIN_PAGE.STATUSES.BLOCKED',
  },

  lessonsNumber: 14,
  testsNumber: 5,
  courseListItems: [
    { title: 'Введение', number: 1, status: 'completed' },
    { title: 'Введение', number: 2, status: 'start' },
    { title: 'Введение', number: 3 },
    { title: 'Введение', number: 4 },
    { title: 'Введение', number: 5 },
  ] as CourseListItemType[],
  accordionItems: [
    {
      value: 'item-1',
      number: 1,
      messageNumber: 1,
      content:
        'Ревью ментора Ревью ментора Ревью ментора Ревью ментора Ревью ментора Ревью ментора Ревью ментора Ревью ментора Ревью ментора Ревью ментора Ревью ментора Ревью ментора Ревью ментора Ревью ментора Ревью ментора Ревью ментора Ревью ментора Ревью ментора Ревью ментора Ревью ментора Ревью ментора Ревью ментора Ревью ментора Ревью ментора Ревью ментора Ревью ментора Ревью ментора Ревью ментора Ревью ментора Ревью ментора',
    },
    {
      value: 'item-2',
      number: 2,
      messageNumber: 1,
      content: 'Ревью ментора',
    },
  ] as AccordionItemType[],
};
