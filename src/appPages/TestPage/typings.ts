import { LessonTestResponseType } from '@/api/endpoints/test';

export type TestDataType = LessonTestResponseType & {
  moduleSequenceOrder: number;
  lessonSequenceOrder: number;
};

export type TestPagePropsType = {
  lessonId: string;
  moduleId: string;
  lessonTest?: TestDataType;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
};
