export enum ExamStatus {
  Completed = 'completed',
  Failed = 'failed',
  Available = 'available',
  Unavailable = 'unavailable',
}

export type Exam = {
  title: string;
  description: string;
  questions: number;
  time: number;
}

export type ExamCardProps = {
  exam: Exam;
  status: ExamStatus;
}