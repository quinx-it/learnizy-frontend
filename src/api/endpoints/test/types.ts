export type TestType = 'LESSON_TEST';

export const enum AnswerInputType {
  Text = 'TEXT',
  Voice = 'VOICE',
}

export type QuestionAnswerSubmitType = {
  questionId: number;
  inputType: AnswerInputType;
  textAnswer?: string | null;
  voiceFileUrl?: string | null;
  voiceTranscript?: string | null;
};

export type QuestionAnswerFormType = {
  textAnswer?: string;
  file?: Blob | null;
  voiceFileUrl?: string | null;
  voiceTranscript?: string | null;
};

export type LessonQuestionItemType = {
  questionId: number;
  text: string;
  sequenceOrder: number;
  maxScore?: number;
};

export type LessonTestResponseType = {
  id: number;
  lessonId: number;
  moduleId: number;
  moduleSequenceOrder: number;
  lessonSequenceOrder: number;
  testType: TestType;
  title: string;
  passThresholdPercentage: number;
  questions: LessonQuestionItemType[];
};

export type CreateLessonTestQuestionRequest = {
  text: string;
  sequenceOrder: number;
  maxScore?: number;
};

export type CreateLessonTestRequest = {
  testType: 'LESSON_TEST';
  lessonId: number;
  moduleId: number;
  title: string;
  passThresholdPercentage: number;
  questions: CreateLessonTestQuestionRequest[];
};

export type UpdateLessonTestRequest = CreateLessonTestRequest;

export type LessonTestSubmitType = {
  testId: number;
  answers: QuestionAnswerSubmitType[];
};

export type LessonTestFormValuesType = {
  questions: QuestionAnswerFormType[];
};

export const enum TestStatus {
  Submitted = 'SUBMITTED',
  Evaluating = 'EVALUATING',
  Evaluated = 'EVALUATED',
  Failed = 'FAILED',
}

export const enum AnswerEvaluation {
  Correct = 'CORRECT',
  Incorrect = 'INCORRECT',
  Partial = 'PARTIAL',
  Unassessed = 'UNASSESSED',
}

export interface ILessonAnswer extends QuestionAnswerSubmitType {
  evaluation?: AnswerEvaluation | null;
  notes?: string | null;
}

export interface ILessonTestResult {
  id: number;
  userId: number;
  testId: number;
  lessonId: number;
  moduleId: number;

  status: TestStatus;
  answers: ILessonAnswer[];

  scorePercent: number;
  passed: boolean;

  createdAt: string;
  updatedAt: string;
  evaluatedAt?: string | null;
  failedReason?: string | null;
}

export interface IAnswerView {
  questionId: number;
  questionText: string;
  inputType: 'TEXT' | 'VOICE';
  textAnswer: string | null;
  voiceFileUrl: string | null;
  voiceTranscript: string | null;
  evaluation: AnswerEvaluation;
  notes: string | null;
}

export interface ITestAttemptResponse {
  id: number;
  userId: number;
  testId: number;
  lessonId: number;
  moduleId: number;
  status: TestStatus;
  answers: IAnswerView[];
  scorePercent: number | null;
  passed: boolean | null;
  createdAt: string;
  updatedAt: string;
  evaluatedAt: string | null;
  failedReason: string | null;
}
