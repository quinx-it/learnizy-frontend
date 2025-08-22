
export interface LessonProgress {
  theoryCompleted: boolean;
  voiceTaskCompleted: boolean;
  testTaskCompleted: boolean;
  testResult?: number;
}

export interface Lesson {
  id: number;
  title: string;
  sequenceOrder: number;
  progress: LessonProgress;
}