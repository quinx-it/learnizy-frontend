import { ModuleCardType } from './types';

export const STATUS = {
  completed: 'Пройден',
  active: 'Продолжить',
  blocked: 'Заблокирован',
  start: 'Начать',
} as const;

export type StatusKey = keyof typeof STATUS;
export type StatusValue = (typeof STATUS)[StatusKey];

export const constants = {
  status: STATUS,
  bonus: 'Бонусный модуль',
} as const;

export const completedModule: ModuleCardType = {
  img_url: 'images/astronaut1.png',
  title: 'Введение',
  id: 'module-1',
  module_number: 1,
  description:
    'Узнайте, как будет построен курс: какие форматы занятий вас ждут и как они помогут пройти собеседование. Определим цели, разберём частые ошибки и начнём строить индивидуальную стратегию подготовки.',
  bonus: false,
  total_tasks: 6,
  status: {
    state: 'completed',
    progress: 5,
    total_stars: 5,
  },
  lessons: [
    {
      name: 'Типы и интерфейсы',
      verified: true,
      stars: 10,
      total_stars: 10,
      id: 'lesson-1',
      tasks: [
        {
          name: 'Базовые типы',
          start: 3,
          total_stars: 3,
          id: 'task-1',
        },
        {
          name: 'Интерфейсы',
          start: 4,
          total_stars: 4,
          id: 'task-2',
        },
        {
          name: 'Типы объединений',
          start: 3,
          total_stars: 3,
          id: 'task-3',
        },
      ],
    },
    {
      name: 'Функции',
      verified: true,
      stars: 8,
      total_stars: 10,
      id: 'lesson-2',
      tasks: [
        {
          name: 'Типы функций',
          start: 3,
          total_stars: 3,
          id: 'task-4',
        },
        {
          name: 'Перегрузки',
          start: 2,
          total_stars: 3,
          id: 'task-5',
        },
        {
          name: 'Дженерики',
          start: 3,
          total_stars: 4,
          id: 'task-6',
        },
      ],
    },
  ],
};

export const inProgressModule: ModuleCardType = {
  img_url: 'images/astronaut2.png',
  title: 'Анализ',
  id: 'module-2',
  module_number: 2,
  description:
    'Разберём ваш профессиональный путь: от навыков и опыта до достижений. Вы поймёте, как сформулировать свои сильные стороны, на чём сделать акцент в резюме и как преподнести себя.',
  bonus: false,
  total_tasks: 12,
  status: {
    state: 'active',
    progress: '20',
  },
  lessons: [
    {
      name: 'Декораторы',
      verified: true,
      stars: 5,
      total_stars: 8,
      id: 'lesson-3',
      tasks: [
        {
          name: 'Декораторы классов',
          start: 2,
          total_stars: 3,
          id: 'task-7',
        },
        {
          name: 'Декораторы методов',
          start: 3,
          total_stars: 5,
          id: 'task-8',
        },
      ],
    },
    {
      name: 'Миксины',
      verified: false,
      stars: 0,
      total_stars: 6,
      id: 'lesson-4',
      tasks: [
        {
          name: 'Основы миксинов',
          start: 0,
          total_stars: 3,
          id: 'task-9',
        },
        {
          name: 'Продвинутые техники',
          start: 0,
          total_stars: 3,
          id: 'task-10',
        },
      ],
    },
  ],
};

export const lockedModule: ModuleCardType = {
  img_url: 'images/astronaut3.png',
  title: 'Резюме',
  id: 'module-3',
  module_number: 3,
  description:
    'В этом модуле вы научитесь составлять сильное, структурированное резюме под конкретные вакансии. Разберём, как выделить ключевые навыки, грамотно описать опыт и избежать типичных ошибок.',
  bonus: false,
  total_tasks: 0,
  status: {
    state: 'blocked',
    progress: null,
  },
  lessons: [],
};

export const newModule: ModuleCardType = {
  img_url: 'images/astronaut4.png',
  title: 'Введение',
  id: 'module-4',
  module_number: 4,
  description:
    'Узнайте, как будет построен курс: какие форматы занятий вас ждут и как они помогут пройти собеседование. Определим цели, разберём частые ошибки и начнём строить индивидуальную стратегию подготовки.',
  bonus: true,
  total_tasks: 2,
  status: {
    state: 'start',
    progress: 0,
  },
  lessons: [
    {
      name: 'Профилирование',
      verified: false,
      stars: 0,
      total_stars: 4,
      id: 'lesson-5',
      tasks: [
        {
          name: 'Инструменты профилирования',
          start: 0,
          total_stars: 2,
          id: 'task-11',
        },
        {
          name: 'Анализ результатов',
          start: 0,
          total_stars: 2,
          id: 'task-12',
        },
      ],
    },
  ],
};
