import { ProgressStatus } from './const';

export type ProgressCardPropsType = {
  title: string;
  subTitle: string;
  totalModules?: number;
  modules?: number;
  totalLessons: number;
  lessons: number;
  status?: ProgressStatus;
  image?: string;
  onClick?: () => void;
};
