export const STATUS = {
  completed: 'STATUS.COMPLETED',
  active: 'STATUS.ACTIVE',
  blocked: 'STATUS.BLOCKED',
  start: 'STATUS.START',
} as const;

export type StatusKeyType = keyof typeof STATUS;
export type StatusValueType = (typeof STATUS)[StatusKeyType];

export const constants = {
  status: STATUS,
  bonus: 'Бонусный модуль',
} as const;
