import { type FieldErrors } from 'react-hook-form';

import { type LessonQuestionItemType, type LessonTestFormValuesType } from '@/api/endpoints/test';

export type LessonQuestionPropsType = LessonQuestionItemType & {
  type?: 'checkbox' | 'field';
  answerFieldName: string;
  fileFieldName: string;
  errors: FieldErrors<LessonTestFormValuesType>;
  totalQuestions: number;
};
