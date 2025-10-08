export const STATUS = {
  completed: 'Пройден',
  active: 'Продолжить',
  blocked: 'Заблокирован',
  start: 'Начать',
} as const;

export type StatusKeyType = keyof typeof STATUS;
export type StatusValueType = (typeof STATUS)[StatusKeyType];

export const constants = {
  status: STATUS,
  bonus: 'Бонусный модуль',
} as const;
