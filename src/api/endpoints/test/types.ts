export type TestType = 'LESSON_TEST';

export enum AnswerInputType {
  TEXT = 'TEXT',
  VOICE = 'VOICE',
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

export type LessonTestSubmitType = {
  testId: number;
  answers: QuestionAnswerSubmitType[];
};

export type LessonTestFormValuesType = {
  questions: QuestionAnswerFormType[];
};

export type LessonQuestionItemType = {
  questionId: number;
  text: string;
  sequenceOrder: number;
  maxScore?: number;
};

export enum TestStatus {
  SUBMITTED = 'SUBMITTED',
  EVALUATING = 'EVALUATING',
  EVALUATED = 'EVALUATED',
  FAILED = 'FAILED',
}

export enum AnswerEvaluation {
  CORRECT = 'CORRECT',
  INCORRECT = 'INCORRECT',
  PARTIAL = 'PARTIAL',
  UNASSESSED = 'UNASSESSED',
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
  evaluation: 'CORRECT' | 'INCORRECT' | 'PARTIAL' | 'UNASSESSED';
  notes: string | null;
}

export interface ITestAttemptResponse {
  id: number;
  userId: number;
  testId: number;
  lessonId: number;
  moduleId: number;
  status: 'SUBMITTED' | 'EVALUATING' | 'EVALUATED' | 'FAILED';
  answers: IAnswerView[];
  scorePercent: number | null;
  passed: boolean | null;
  createdAt: string;
  updatedAt: string;
  evaluatedAt: string | null;
  failedReason: string | null;
}
