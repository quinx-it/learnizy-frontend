import { LessonStatus, CompletionStatus } from './constants';

export interface IUserDTO {
  id: number;
  username: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface IUpdateUserDTO {
  username?: string;
  email?: string;
}

export interface IAnalyticResponse {
  analyticsSummary: {
    totalUsers: { value: number; changePercentage: number };
    activeUsers: { value: number; changePercentage: number };
    retentionRate: { value: number; changePercentage: number };
  };
  userTable: {
    id: number;
    fullName: string;
    progress: string;
    currentModule: string;
    currentLesson: number;
  }[];
  userGrowthChart: {
    currentMonthName: string;
    newUsersMonthly: number;
    activeUsersMonthly: number;
  };
}

export interface IPage<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
}

export interface IModuleResponse {
  id: number;
  title: string;
  description: string;
  courseId: number;
  sequenceOrder: number;
}

export interface IModuleInfo {
  id: number;
  title: string;
  sequenceOrder: number;
  description: string;
  totalLessons: number;
  completedLessons: number;
  completionStatus: CompletionStatus;
}

export interface IModuleRequest {
  title: string;
  description: string;
  courseId: number;
  sequenceOrder: number;
}

export interface ILessonDTO {
  id: number;
  title: string;
  sequenceOrder: number;
  status?: LessonStatus;
  progress?: {
    theoryCompleted: boolean;
    voiceTaskCompleted: boolean;
    testTaskCompleted: boolean;
    testResult: number | null;
  };
}

export interface IModuleWithLessonList extends IModuleResponse {
  lessons: ILessonDTO[];
}

export interface IModuleDetailsDTO {
  moduleInfo: IModuleResponse & {
    totalLessons: number;
    completedLessons: number;
    completionStatus: CompletionStatus;
  };
  lessons: ILessonDTO[];
}

export interface ILessonRequest {
  moduleId: number;
  title: string;
  description: string;
  content: string;
  contentBlocks?: null;
}

export interface IUpdateLessonRequest extends ILessonRequest {
  sequenceOrder?: number;
}

export interface ILessonMarkdownContentUpdateRequest {
  content: string;
}

export interface ILessonWithContentList {
  id: number;
  moduleId: number;
  title: string;
  description: string;
  content: string;
  contentBlocks: null;
  sequenceOrder: number;
  createdAt: string;
  updatedAt: string;
}
