import { CourseListItemType } from '@/shared/components/course-list-item/typings';
import { AccordionItemType } from '@/shared/ui/accordion-review/typings';

export const MAIN_PAGE_SEO = {
  title: 'Learnizy - Подготовка IT-разработчиков к собеседованиям с гарантией трудоустройства',
  description:
    'Гарантированное трудоустройство Frontend, Backend, DevOps, Java-разработчиков по модели ISA. AI-тренажер, оплата только после устройства на работу. 87% выпускников получают оффер.',
  keywords:
    'java разработчик собеседование, гарантия трудоустройства, подготовка к техническому собеседованию, ai тренажер собеседования, курсы java с трудоустройством, собеседование подготовка, isa обучение, трудоустройство it, тех интервью, карьера в it, frontend backend курсы, learnizy, онлайн школа, курсы обучения, дистанционное образование, платформа обучения, репетиторы онлайн',
  ogTitle:
    'Плати за обучение только после трудоустройства. AI-тренажер собеседований и менторы из топовых компаний.',
  ogDescription:
    'Платите за обучение только после устройства на работу. AI-тренажер, менторы из топ-компаний, 87% выпускников получают оффер. Персональный подход к обучению. Курсы по программированию.',
  fullUrl: 'https://learnizy.com',
  baseUrLClean: 'https://learnizy.com',
  ogLocale: 'ru_RU',
};

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
    NOT_STARTED: 'LEARN_MAIN_PAGE.STATUSES.NOT_STARTED',
    IN_PROGRESS: 'LEARN_MAIN_PAGE.STATUSES.IN_PROGRESS',
    COMPLETED: 'LEARN_MAIN_PAGE.STATUSES.COMPLETED',
    BLOCKED: 'LEARN_MAIN_PAGE.STATUSES.BLOCKED',
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
