import { CompletionStatus } from '@/api/endpoints/types';
import { constants } from './constants';

export const getModuleStatus = (status: CompletionStatus) => {
  if (status === CompletionStatus.COMPLETED) {
    return { statusText: constants.statuses[status], completed: true };
  }

  return { statusText: constants.statuses[status], completed: false };
};
