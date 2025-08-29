export type TestType = 'LESSON_TEST';

export enum AnswerInputType {
  TEXT = 'TEXT',
  VOICE = 'VOICE',
};

export type QuestionAnswerSubmit = {
  questionId: number;
  inputType: AnswerInputType;
  textAnswer?: string | null;
  voiceFileUrl?: string | null;
  voiceTranscript?: string | null;
};

export type QuestionAnswerForm = {
  textAnswer?: string;
  file?: Blob | null;
  voiceFileUrl?: string | null;
  voiceTranscript?: string | null;
};

export type LessonTestResponse = {
  id: number;
  lessonId: number;
  moduleId: number;
  testType: TestType;
  title: string;
  passThresholdPercentage: number;
  questions: LessonQuestionItemType[];
  lessonSequenceOrder:number;
  moduleSequenceOrder:number;
};

export type LessonTestSubmit = {
  testId: number;
  answers: QuestionAnswerSubmit[];
};

export type LessonTestFormValues = {
  questions: QuestionAnswerForm[];
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

export interface LessonAnswer extends QuestionAnswerSubmit {
  evaluation?: AnswerEvaluation | null;
  notes?: string | null;
}

export interface LessonTestResult {
  id: number;
  userId: number;
  testId: number;
  lessonId: number;
  moduleId: number;

  status: TestStatus;
  answers: LessonAnswer[];

  scorePercent: number;
  passed: boolean;

  createdAt: string;
  updatedAt: string;
  evaluatedAt?: string | null;
  failedReason?: string | null;
}
