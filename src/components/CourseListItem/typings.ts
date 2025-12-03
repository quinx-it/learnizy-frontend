import { CourseListItemStatus } from './constants';

export type CourseListItemType = {
  title: string;
  number: number;
  status?: CourseListItemStatus;
  progress?: number;
  onClick?: () => void;
};
