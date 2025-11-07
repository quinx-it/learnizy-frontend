import { TableCellAlign } from './typings';

export const normalizeTableCellAlign = (align: string | undefined): TableCellAlign => {
  if (!align || align === 'char') return undefined;

  const validAligns: TableCellAlign[] = ['inherit', 'center', 'left', 'right', 'justify'];

  return validAligns.includes(align as TableCellAlign) ? (align as TableCellAlign) : undefined;
};
