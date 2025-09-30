export interface CourseInfo {
  id: number;
  title: string;
  currentModuleId: number;
  totalModules: number;
  totalLessons: number;
  completedModules: number;
  completedLessons: number;
}

export interface ModuleInfo {
  id: number;
  title: string;
  description: string;
  totalLessons: number;
  completedLessons: number;
  completionStatus: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  sequenceNumber: number;
}

export interface WeeklyActivity {
  date: string;
  lessonsCompleted: number;
  testsPassed: number;
}

export interface MainPageInfoResponse {
  courseInfo: CourseInfo;
  modules: ModuleInfo[];
  weeklyActivity: WeeklyActivity[];
}
