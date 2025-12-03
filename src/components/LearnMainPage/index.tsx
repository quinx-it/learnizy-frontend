'use client';

import { Box } from '@mui/material';
import { FC } from 'react';

import { ModuleCompletionStatus, useGetMainPageProgressQuery } from '@/api/endpoints/progress';
import Breadcrumbs from '@/components/Breadcrumbs';
import CardWrapper from '@/components/CardWrapper';
import CourseListItem from '@/components/CourseListItem';
import { CourseListItemStatus } from '@/components/CourseListItem/constants';
import ProgressCard from '@/components/ProgressCard';
import { ProgressStatus } from '@/components/ProgressCard/constants';
import StatisticsChart from '@/components/StatisticsChart';
import { Text } from '@/components/Typography';
import { routes } from '@/const';
import { useRouter, useTranslation } from '@/hooks';

import { constants, ModuleStatus } from './constants';

import {
  Container,
  CourseDivider,
  CourseTitle,
  ModulesList,
  StatisticsDivider,
  StatisticsTitle,
} from './styles';

const mapModuleCompletionStatusToModuleStatus = (
  apiStatus: ModuleCompletionStatus,
  completedLessons: number,
): ModuleStatus => {
  if (apiStatus === ModuleCompletionStatus.BLOCKED) {
    return ModuleStatus.BLOCKED;
  }

  if (apiStatus === ModuleCompletionStatus.COMPLETED) {
    return ModuleStatus.COMPLETED;
  }

  if (completedLessons > 0) {
    return ModuleStatus.IN_PROGRESS;
  }

  return ModuleStatus.NOT_STARTED;
};

const mapModuleStatusToCourseListItemStatus = (status: ModuleStatus): CourseListItemStatus => {
  switch (status) {
    case ModuleStatus.BLOCKED:
      return CourseListItemStatus.BLOCKED;
    case ModuleStatus.COMPLETED:
      return CourseListItemStatus.COMPLETED;
    case ModuleStatus.IN_PROGRESS:
      return CourseListItemStatus.IN_PROGRESS;
    case ModuleStatus.NOT_STARTED:
      return CourseListItemStatus.NOT_STARTED;
    default:
      return CourseListItemStatus.NOT_STARTED;
  }
};

const LearnMainPage: FC = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const { data: mainPageProgress, error } = useGetMainPageProgressQuery();

  if (error || !mainPageProgress) return null;

  const currentModule = mainPageProgress.modules.find(
    (mod) => mod.id === mainPageProgress.courseInfo.currentModuleId,
  );

  return (
    <Box>
      <Breadcrumbs rootDescription={mainPageProgress.courseInfo.title || ''} />

      <Container>
        <ProgressCard
          title={t(constants.titles.currentCourse)}
          subTitle={mainPageProgress.courseInfo.title || ''}
          modules={mainPageProgress.courseInfo.completedModules || 0}
          totalLessons={mainPageProgress.courseInfo.totalLessons || 0}
          totalModules={mainPageProgress.courseInfo.totalModules || 0}
          lessons={mainPageProgress.courseInfo.completedLessons || 0}
          image="/images/rocket.webp"
        />

        <ProgressCard
          title={t(constants.titles.currentModule)}
          subTitle={currentModule?.title || t(constants.titles.moduleName)}
          totalLessons={currentModule?.totalLessons || 0}
          lessons={currentModule?.completedLessons || 0}
          status={ProgressStatus.CONTINUE}
          onClick={() => currentModule && router.push(`${routes.user.modules}/${currentModule.id}`)}
        />

        <CardWrapper>
          <Box>
            <CourseTitle>
              <Text tag="span" variant="m-bold">
                {t('COMMON.COURSE_LABEL')}{' '}
                <Text tag="span" className="text-medium" variant="m-bold">
                  {mainPageProgress.courseInfo.title}
                </Text>
              </Text>
            </CourseTitle>
            <CourseDivider />
            <ModulesList>
              {mainPageProgress.modules.map((module) => {
                const moduleProgress =
                  module.totalLessons > 0
                    ? (module.completedLessons / module.totalLessons) * 100
                    : 0;
                const moduleStatus = mapModuleCompletionStatusToModuleStatus(
                  module.completionStatus,
                  module.completedLessons,
                );
                const courseListItemStatus = mapModuleStatusToCourseListItemStatus(moduleStatus);

                return (
                  <li key={module.id}>
                    <CourseListItem
                      number={module.sequenceNumber}
                      title={module.title}
                      status={courseListItemStatus}
                      progress={moduleProgress}
                      onClick={() =>
                        moduleStatus !== ModuleStatus.BLOCKED &&
                        router.push(`${routes.user.modules}/${module.id}`)
                      }
                    />
                  </li>
                );
              })}
            </ModulesList>
          </Box>
        </CardWrapper>
        <CardWrapper>
          <Box>
            <StatisticsTitle>
              <Text variant="m-bold">{t(constants.titles.statistics)}</Text>
            </StatisticsTitle>
            <StatisticsDivider />
            <StatisticsChart weeklyActivity={mainPageProgress.weeklyActivity ?? []} />
          </Box>
        </CardWrapper>
      </Container>
    </Box>
  );
};

export default LearnMainPage;
