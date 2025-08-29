import { CompletionStatus } from '@/api/endpoints/types';
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
  lessonsNumber: 14,
  testsNumber: 5,
  statuses: {
    [CompletionStatus.NOT_STARTED]: 'Начать',
    [CompletionStatus.COMPLETED]: 'Пройден',
    [CompletionStatus.IN_PROGRESS]: 'Продолжить',
    [CompletionStatus.BLOCKED]: '',
  },
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
