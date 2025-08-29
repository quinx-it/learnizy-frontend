import { CompletionStatus } from "../types";

export type CourseInfo = {
  id: number;
  title: string;
  currentModuleId: number;
  totalModules: number;
  totalLessons: number;
  completedModules: number;
  completedLessons: number;
};

export type MainModuleInfo = {
  id: number;
  title: string;
  description: string;
  totalLessons: number;
  completedLessons: number;
  completionStatus: CompletionStatus;
  sequenceOrder: number;
};

export type CourseData = {
  courseInfo: CourseInfo;
  modules: MainModuleInfo[];
};
