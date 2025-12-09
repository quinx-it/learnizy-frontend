import Image from 'next/image';
import { FC } from 'react';

import { CompletionStatus } from '@/api/endpoints/types';
import ProgressBar from '@/components/Progress';
import { Text } from '@/components/Typography';
import { percentage } from '@/lib/utils';

import { constants } from './const';
import { ProgressModuleType, IProcentContentProps } from './typings';

import { ProgressContainer, StarContainer } from './styles';

const ProcentContent: FC<IProcentContentProps> = (props) => {
  const { progress } = props;

  return (
    <ProgressContainer>
      <ProgressBar size={20} variant="circular" value={progress ? Number(progress) : 1} />
      <Text variant="m"> {progress}%</Text>
    </ProgressContainer>
  );
};

export const renderModuleProgress = (
  completionStatus: CompletionStatus,
  completedLessons: number,
  totalLessons: number,
): ProgressModuleType => {
  const progress = percentage(totalLessons, completedLessons);

  switch (completionStatus) {
    case CompletionStatus.Completed:
      return {
        element: (
          <StarContainer>
            <Image src="/images/star-icon-default.svg" alt="Star" width={25} height={25} />
            <Text variant="m">
              {completedLessons}/{totalLessons}
            </Text>
          </StarContainer>
        ),
        status: constants.status.completed,
      };

    case CompletionStatus.InProgress:
      return {
        element: <ProcentContent progress={progress} />,
        status: constants.status.active,
      };

    case CompletionStatus.NotStarted:
      return {
        element: <ProcentContent progress={progress} />,
        status: constants.status.start,
      };

    case CompletionStatus.Blocked:
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
