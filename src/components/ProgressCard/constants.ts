export enum ProgressStatus {
  Continue = 'Continue',
  Start = 'Start',
}

export const constants = {
  statuses: {
    [ProgressStatus.Continue]: 'COMMON.STATUS_CONTINUE',
    [ProgressStatus.Start]: 'STATUS.START',
  },
};
