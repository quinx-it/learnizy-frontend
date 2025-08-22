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
