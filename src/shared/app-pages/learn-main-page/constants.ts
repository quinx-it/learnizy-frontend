import { CourseListItem } from '@/shared/components/course-list-item';
import { AccordionItemType } from '@/shared/ui/accordion-review/accordion-review';

export const constants = {
  titles: {
    currentCourse: 'Текущий курс',
    currentModule: 'Текущий модуль',
    courseName: 'Java Core',
    moduleName: 'Введение',
    review: 'Ревью ментора',
    statistics: 'Статистика активности',
  },
  statuses: {
    NOT_STARTED: 'Не начат',
    IN_PROGRESS: 'В процессе',
    COMPLETED: 'Завершен',
    BLOCKED: 'Заблокирован',
  },
  lessonsNumber: 14,
  testsNumber: 5,
  courseListItems: [
    { title: 'Введение', number: 1, status: 'completed' },
    { title: 'Введение', number: 2, status: 'start' },
    { title: 'Введение', number: 3 },
    { title: 'Введение', number: 4 },
    { title: 'Введение', number: 5 },
  ] as CourseListItem[],
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
