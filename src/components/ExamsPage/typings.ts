export enum ExamStatus {
  Completed = 'Completed',
  Failed = 'Failed',
  Available = 'Available',
  Unavailable = 'Unavailable',
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

export interface IExamsPageProps {
  courseId?: number;
}
