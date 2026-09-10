import { type ILessonProgressItem, type ILessonProgress } from '@/api/endpoints/lessons';

export type LessonCardPropsType = ILessonProgressItem & {
  progress: ILessonProgress;
  onClick: (lessonId: number) => void;
};
