export type CourseListItemType = {
  title: string;
  number: number;
  status?: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'BLOCKED';
  progress?: number;
  onClick?: () => void;
};
