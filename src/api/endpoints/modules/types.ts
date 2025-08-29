import { Lesson } from "../lessons/types";
import { CompletionStatus } from "../types";

export interface ModuleInfo {
  id: number;
  title: string;
  sequenceOrder: number
  description: string;
  totalLessons: number;
  completedLessons: number;
  completionStatus: CompletionStatus;
}

export interface ModuleData {
  moduleInfo: ModuleInfo;
  lessons: Lesson[];
}

export interface GetModuleRequest {
  courseId: number
  moduleId: number
}

