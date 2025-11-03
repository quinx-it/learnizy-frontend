import { FieldErrors } from 'react-hook-form';
import { LessonQuestionItemType, LessonTestFormValuesType } from '@/api/endpoints/test';

export type LessonQuestionPropsType = LessonQuestionItemType & {
  type?: 'checkbox' | 'field';
  answerFieldName: string;
  fileFieldName: string;
  errors: FieldErrors<LessonTestFormValuesType>;
  totalQuestions: number;
};
