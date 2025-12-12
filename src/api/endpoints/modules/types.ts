import { type ILesson } from '../lessons/types';
import { type CompletionStatus } from '../types';

export interface IModuleInfo {
  id: number;
  title: string;
  sequenceOrder: number;
  description: string;
  totalLessons: number;
  completedLessons: number;
  completionStatus: CompletionStatus;
}

export interface IModuleData {
  moduleInfo: IModuleInfo;
  lessons: ILesson[];
}

export interface IGetModuleRequest {
  courseId: number;
  moduleId: number;
}
