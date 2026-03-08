export enum TestFormMode {
  Create = 'create',
  Edit = 'edit',
}

export interface ILessonItemPageProps {
  lessonId: string;
  moduleId: string;
  courseId?: number;
}
