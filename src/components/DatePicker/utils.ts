export const formatDate = (date: Date | undefined) => {
  if (!date) return '';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}.${month}.${year}`;
};

export const parseDateString = (value: string) => {
  const [day, month, year] = value.split('.').map(Number);

  if (!day || !month || !year) return undefined;

  const date = new Date(year, month - 1, day);

  if (date.getDate() === day && date.getMonth() === month - 1 && date.getFullYear() === year) {
    return date;
  }

  return undefined;
};
