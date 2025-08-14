import { JSX } from 'react';
import { constants, StatusValue } from './constants';
import { ModuleStatus } from './types';
import { StarIcon } from '@/shared/ui/icons';
import { Text } from '@/shared/ui/typography';
import { ProgressBar } from '@/shared/ui/progress';

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

export const renderModuleProgress = (status: ModuleStatus): ProgressModuleType => {
  switch (status.state) {
    case 'completed':
      return {
        element: (
          <div className="text-medium flex gap-1.5">
            <StarIcon className="size-4.5" />
            <Text variant={'m'} className="">
              {' '}
              {status.progress}/{status.total_stars}
            </Text>
          </div>
        ),
        status: constants.status.completed,
      };

    case 'blocked':
      return {
        element: null,
        status: constants.status.blocked,
      };
    case 'start':
      return {
        element: <ProcentContent progress={status.progress} />,
        status: constants.status.start,
      };

    default:
      return {
        element: <ProcentContent progress={status.progress} />,
        status: constants.status.active,
      };
  }
};
