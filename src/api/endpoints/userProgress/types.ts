import { CompletionStatus } from "../types";

export type MainCourseInfo = {
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
  sequenceNumber: number;
};

export type MainData = {
  courseInfo: MainCourseInfo;
  modules: MainModuleInfo[];
};
