import { CourseListItemStatus } from './const';

export type CourseListItemType = {
  title: string;
  number: number;
  status?: CourseListItemStatus;
  progress?: number;
  onClick?: () => void;
};
