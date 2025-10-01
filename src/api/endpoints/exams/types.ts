export type ExamStatus = 'BLOCKED' | 'AVAILABLE' | 'FAILED' | 'PASSED';

export interface ExamLastResult {
  scorePercent: number;
  correct: number;
  total: number;
}

export interface Exam {
  testId: number;
  moduleId: number;
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
