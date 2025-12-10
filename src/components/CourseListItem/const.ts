export const enum CourseListItemStatus {
  NotStarted = 'NotStarted',
  InProgress = 'InProgress',
  Completed = 'Completed',
  Blocked = 'Blocked',
}

export const getStatusTranslationKey = (status: CourseListItemStatus | undefined): string => {
  if (!status) return 'PROGRESS_STATUSES.NOT_STARTED';

  switch (status) {
    case CourseListItemStatus.Completed:
      return 'PROGRESS_STATUSES.COMPLETED';
    case CourseListItemStatus.InProgress:
      return 'PROGRESS_STATUSES.IN_PROGRESS';
    case CourseListItemStatus.Blocked:
      return 'PROGRESS_STATUSES.BLOCKED';
    default:
      return 'PROGRESS_STATUSES.NOT_STARTED';
  }
};
