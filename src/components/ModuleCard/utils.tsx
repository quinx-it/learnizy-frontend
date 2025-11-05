import { FC } from 'react';

import { CompletionStatus } from '@/api/endpoints/types';
import { percentage } from '@/lib/utils';
import { StarIcon } from '@/components/ui/Icons';
import { ProgressBar } from '@/components/ui/Progress';
import { Text } from '@/components/ui/Typography';

import { constants } from './constants';
import { ProgressModuleType, IProcentContentProps } from './typings';

const ProcentContent: FC<IProcentContentProps> = (props) => {
  const { progress } = props;

  return (
    <div className="text-medium flex gap-1.5 self-center">
      <ProgressBar
        size={20}
        variant="circular"
        value={progress ? Number(progress) : 1}
        className="text-medium stroke-medium"
      />
      <Text variant="m" className="">
        {' '}
        {progress}%
      </Text>
    </div>
  );
};

export const renderModuleProgress = (
  completionStatus: CompletionStatus,
  completedLessons: number,
  totalLessons: number,
): ProgressModuleType => {
  const progress = percentage(totalLessons, completedLessons);

  switch (completionStatus) {
    case CompletionStatus.COMPLETED:
      return {
        element: (
          <div className="text-medium flex gap-1.5">
            <StarIcon className="size-4.5" />
            <Text variant="m">
              {completedLessons}/{totalLessons}
            </Text>
          </div>
        ),
        status: constants.status.completed,
      };

    case CompletionStatus.NOT_STARTED:
      return {
        element: <ProcentContent progress={progress} />,
        status: constants.status.start,
      };

    case CompletionStatus.BLOCKED:
      return {
        element: null,
        status: constants.status.blocked,
      };

    default:
      return {
        element: <ProcentContent progress={progress} />,
        status: constants.status.active,
      };
  }
};
