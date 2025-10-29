export type ProgressCardPropsType = {
  title: string;
  subTitle: string;
  totalModules?: number;
  modules?: number;
  totalLessons: number;
  lessons: number;
  status?: 'Продолжить' | 'Начать';
  image?: string;
  onClick?: () => void;
};
