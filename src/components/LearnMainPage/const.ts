export const enum ModuleStatus {
  NotStarted = 'NotStarted',
  InProgress = 'InProgress',
  Completed = 'Completed',
  Blocked = 'Blocked',
}

export const constants = {
  titles: {
    currentCourse: 'LEARN_MAIN_PAGE.TITLES.CURRENT_COURSE',
    currentModule: 'LEARN_MAIN_PAGE.TITLES.CURRENT_MODULE',
    moduleName: 'LEARN_MAIN_PAGE.TITLES.MODULE_NAME',
    review: 'LEARN_MAIN_PAGE.TITLES.REVIEW',
    statistics: 'LEARN_MAIN_PAGE.TITLES.STATISTICS',
  },
  statuses: {
    [ModuleStatus.NotStarted]: 'LEARN_MAIN_PAGE.STATUSES.NOT_STARTED',
    [ModuleStatus.InProgress]: 'LEARN_MAIN_PAGE.STATUSES.IN_PROGRESS',
    [ModuleStatus.Completed]: 'LEARN_MAIN_PAGE.STATUSES.COMPLETED',
    [ModuleStatus.Blocked]: 'LEARN_MAIN_PAGE.STATUSES.BLOCKED',
  },
};
