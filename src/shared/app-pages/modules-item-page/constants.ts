import { lessonStatuses, LessonType } from "@/shared/components/module-card/types";

export const constants = {
  breadcrumbs: (id: string | number) => [{ label: `Модуль ${id}`, href: '' }],
  examAvailableNumber: 60,
  mockedModuleInfo: {
    id: 1,
    title: 'Введение',
    description:
      'Узнайте, как будет построен курс: какие форматы занятий вас ждут и как они помогут пройти собеседование. Определим цели, разберём частые ошибки и начнём строить индивидуальную стратегию подготовки.',
    courseId: 1,
    progress: 33,
    totalTasks: 5,
    lessons: [
      {
        id: 'l1',
        name: 'Знакомство с курсом',
        status: lessonStatuses.VERIFIED,
        stars: 3,
        total_stars: 3,
        tasks: [
          { id: 't1', name: 'Теория' },
          { id: 't2', name: 'Устное закрепление материала' },
          { id: 't3', name: 'Тестовое задание' },
        ],
      },
      {
        id: 'l2',
        name: 'Цели и формат',
        status: lessonStatuses.ACTIVE,
        stars: 0,
        total_stars: 3,
        tasks: [
          { id: 't1', name: 'Теория' },
          { id: 't2', name: 'Устное закрепление материала' },
          { id: 't3', name: 'Тестовое задание' },
        ],
      },
      {
        id: 'l3',
        name: 'Типичные ошибки',
        status: lessonStatuses.BLOCKED,
        stars: 0,
        total_stars: 3,
        tasks: [
          { id: 't1', name: 'Теория' },
          { id: 't2', name: 'Устное закрепление материала' },
          { id: 't3', name: 'Тестовое задание' },
        ],
      },
    ] as LessonType[],
  },
};