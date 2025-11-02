import { LessonQuestionItemType, LessonTestSubmitType } from '@/api/endpoints/test/types';

export type LessonTestFormPropsType = {
  testId: number;
  questions: LessonQuestionItemType[];
  loading?: boolean;
  onSubmit: (data: LessonTestSubmitType) => void;
};
