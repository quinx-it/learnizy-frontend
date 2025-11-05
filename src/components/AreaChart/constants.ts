const defaultData = [
  { day: 'Пн', value: 120 },
  { day: 'Вт', value: 95 },
  { day: 'Ср', value: 100 },
  { day: 'Чт', value: 140 },
  { day: 'Пт', value: 120 },
  { day: 'Сб', value: 110 },
  { day: 'Вс', value: 120 },
];

const averageValue = Math.min(...defaultData.map((item) => item.value));

export const chartData = [
  { day: 'fake-start', value: averageValue },
  ...defaultData,
  { day: 'fake-end', value: averageValue },
];
