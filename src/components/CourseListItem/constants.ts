export enum CourseListItemStatus {
  NotStarted = 'NotStarted',
  InProgress = 'InProgress',
  Completed = 'Completed',
  Blocked = 'Blocked',
}

export const constants = {
  statuses: {
    [CourseListItemStatus.Completed]: 'PROGRESS_STATUSES.COMPLETED',
    [CourseListItemStatus.NotStarted]: 'PROGRESS_STATUSES.NOT_STARTED',
    [CourseListItemStatus.Blocked]: 'PROGRESS_STATUSES.BLOCKED',
    [CourseListItemStatus.InProgress]: 'PROGRESS_STATUSES.IN_PROGRESS',
  },
};
