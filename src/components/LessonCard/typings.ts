import { ILesson, ILessonProgress } from '@/api/endpoints/lessons';

export type LessonCardPropsType = ILesson & {
  progress: ILessonProgress;
  onClick: (lessonId: number) => void;
};
