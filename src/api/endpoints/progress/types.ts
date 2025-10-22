export interface ICourseInfo {
  id: number;
  title: string;
  currentModuleId: number;
  totalModules: number;
  totalLessons: number;
  completedModules: number;
  completedLessons: number;
}

export interface IModuleInfo {
  id: number;
  title: string;
  description: string;
  totalLessons: number;
  completedLessons: number;
  completionStatus: 'NOT_STARTED' | 'BLOCKED' | 'IN_PROGRESS' | 'COMPLETED';
  sequenceNumber: number;
}

export interface IWeeklyActivity {
  date: string;
  lessonsCompleted: number;
  testsPassed: number;
}

export interface IMainPageInfoResponse {
  courseInfo: ICourseInfo;
  modules: IModuleInfo[];
  weeklyActivity: IWeeklyActivity[];
}
