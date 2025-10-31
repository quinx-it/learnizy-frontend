import { CourseListItemType } from '@/shared/components/course-list-item/typings';
import { AccordionItemType } from '@/shared/ui/accordion-review/typings';

export const MAIN_PAGE_SEO = {
  ru: {
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
  },
  en: {
    title: 'Learnizy - Preparing IT developers for interviews with job guarantee',
    description:
      'Guaranteed employment for Frontend, Backend, DevOps, Java developers under the ISA model. AI simulator, pay only after getting a job. 87% of graduates get an offer.',
    keywords:
      'java developer interview, job guarantee, technical interview preparation, ai interview simulator, java courses with employment, interview prep, isa training, it employment, tech interview, it career, frontend backend courses, learnizy, online school, online tutoring',
    ogTitle:
      'Pay for training only after employment. AI interview simulator and mentors from top companies.',
    ogDescription:
      'Pay for training only after getting a job. AI simulator, mentors from top companies, 87% of graduates get an offer. Personalized learning approach. Programming courses.',
    fullUrl: 'https://learnizy.com/en',
    baseUrLClean: 'https://learnizy.com/en',
    ogLocale: 'en_US',
  },
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
