import { ILesson, ILessonProgress } from '@/api/endpoints/lessons';

export type LessonCardPropsType = ILesson & {
  progress: ILessonProgress;
  index: number;
  onClick: (lessonId: number) => void;
};
