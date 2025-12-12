import { type AccordionItemType } from '@/components/AccordionReview/typings';
import { type CourseListItemType } from '@/components/CourseListItem/typings';

export const enum ModuleStatus {
  NotStarted = 'NotStarted',
  InProgress = 'InProgress',
  Completed = 'Completed',
  Blocked = 'Blocked',
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
    [ModuleStatus.NotStarted]: 'LEARN_MAIN_PAGE.STATUSES.NOT_STARTED',
    [ModuleStatus.InProgress]: 'LEARN_MAIN_PAGE.STATUSES.IN_PROGRESS',
    [ModuleStatus.Completed]: 'LEARN_MAIN_PAGE.STATUSES.COMPLETED',
    [ModuleStatus.Blocked]: 'LEARN_MAIN_PAGE.STATUSES.BLOCKED',
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
