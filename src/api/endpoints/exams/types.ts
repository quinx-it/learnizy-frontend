export type ExamStatus = 'BLOCKED' | 'AVAILABLE' | 'FAILED' | 'PASSED';

export interface ExamLastResult {
  scorePercent: number;
  correct: number;
  total: number;
}

export interface Exam {
  testId: number;
  moduleId: number;
  moduleSequenceOrder: number;
  moduleTitle: string;
  questionsCount: number;
  passThresholdPercentage: number;
  status: ExamStatus;
  lastResult: ExamLastResult | null;
}

export interface ExamsResponse {
  content: Exam[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}

export type Question = {
  questionId: number;
  text: string;
  sequenceOrder: number;
  maxScore: number;
};

export type ExamTestResponse = {
  id: number;
  lessonId: number;
  moduleId: number;
  lessonSequenceOrder: number;
  moduleSequenceOrder: number;
  testType: 'LESSON_TEST' | 'MODULE_EXAM';
  title: string;
  passThresholdPercentage: number;
  questions: Question[];
};