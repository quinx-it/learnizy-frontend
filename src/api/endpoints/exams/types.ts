export const enum ExamApiStatus {
  Passed = 'PASSED',
  Failed = 'FAILED',
  Available = 'AVAILABLE',
  Blocked = 'BLOCKED',
}

export type ExamStatusType = ExamApiStatus;

export interface IExamLastResult {
  scorePercent: number;
  correct: number;
  total: number;
}

export interface IExam {
  testId: number;
  moduleId: number;
  moduleSequenceOrder: number;
  moduleTitle: string;
  questionsCount: number;
  passThresholdPercentage: number;
  status: ExamStatusType;
  lastResult: IExamLastResult | null;
}

export interface IExamsResponse {
  content: IExam[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

export type QuestionType = {
  questionId: number;
  text: string;
  sequenceOrder: number;
  maxScore: number;
};

export type ExamTestResponseType = {
  id: number;
  lessonId: number;
  moduleId: number;
  lessonSequenceOrder: number;
  moduleSequenceOrder: number;
  testType: 'LESSON_TEST' | 'MODULE_EXAM';
  title: string;
  passThresholdPercentage: number;
  questions: QuestionType[];
};
