export type ProgressCardPropsType = {
  title: string;
  subTitle: string;
  totalModules?: number;
  modules?: number;
  totalLessons: number;
  lessons: number;
  status?: string;
  image?: string;
  onClick?: () => void;
};
