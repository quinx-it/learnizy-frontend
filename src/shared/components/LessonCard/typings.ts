import { ILesson, ILessonProgress } from '@/api/endpoints/lessons/types';

export type LessonCardPropsType = ILesson & {
  progress: ILessonProgress;
  index: number;
  onClick: (lessonId: number) => void;
};
