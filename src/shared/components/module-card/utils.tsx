import { JSX } from 'react';
import { constants, StatusValue } from './constants';
import { StarIcon } from '@/shared/ui/icons';
import { Text } from '@/shared/ui/typography';
import { ProgressBar } from '@/shared/ui/progress';
import { CompletionStatus } from '@/api/endpoints/types';

type ProgressModuleType = {
  element: JSX.Element | null;
  status: StatusValue;
};

const ProcentContent = ({ progress }: { progress: number | null | string }) => {
  return (
    <div className="text-medium flex gap-1.5 self-center">
      <ProgressBar
        size={20}
        variant="circular"
        value={progress ? Number(progress) : 1}
        className="text-medium stroke-medium"
      />
      <Text variant={'m'} className="">
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
  const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  switch (completionStatus) {
    case CompletionStatus.COMPLETED:
      return {
        element: (
          <div className="text-medium flex gap-1.5">
            <StarIcon className="size-4.5" />
            <Text variant={'m'}>
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
