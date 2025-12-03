export enum CourseListItemStatus {
  NOT_STARTED = 'NOT_STARTED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  BLOCKED = 'BLOCKED',
}

export const constants = {
  statuses: {
    [CourseListItemStatus.COMPLETED]: 'PROGRESS_STATUSES.COMPLETED',
    [CourseListItemStatus.NOT_STARTED]: 'PROGRESS_STATUSES.NOT_STARTED',
    [CourseListItemStatus.BLOCKED]: 'PROGRESS_STATUSES.BLOCKED',
    [CourseListItemStatus.IN_PROGRESS]: 'PROGRESS_STATUSES.IN_PROGRESS',
  },
};
