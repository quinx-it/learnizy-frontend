import { type LessonQuestionItemType, type LessonTestSubmitType } from '@/api/endpoints/test';

export type LessonTestFormPropsType = {
  testId: number;
  questions: LessonQuestionItemType[];
  loading?: boolean;
  onSubmit: (data: LessonTestSubmitType) => void;
};
