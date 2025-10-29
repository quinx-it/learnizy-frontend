export enum ExamStatus {
  Completed = 'completed',
  Failed = 'failed',
  Available = 'available',
  Unavailable = 'unavailable',
}

export type ExamType = {
  title: string;
  description: string;
  questions: number;
  time: number;
  moduleId: number;
  testId: number;
};

export type ExamCardPropsType = {
  exam: ExamType;
  status: ExamStatus;
};

export interface ExamsPageProps {
  courseId?: number;
}
