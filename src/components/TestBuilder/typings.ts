import { type TestType } from '@/api/endpoints/test';

export type TestFormQuestionType = {
  text: string;
  maxScore: number;
};

export type ExistingTestType = {
  id: number;
  title: string;
  passThresholdPercentage: number;
  questions: { text: string; maxScore?: number }[];
};

export interface ITestBuilderProps {
  testType: TestType;
  moduleId: number;
  lessonId?: number;
  existingTest?: ExistingTestType | null;
  isLoading?: boolean;
  sectionTitle: string;
  emptyMessage: string;
  createButtonLabel: string;
  editButtonLabel: string;
}
