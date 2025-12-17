'use client';

import { Box } from '@mui/material';
import { type FC } from 'react';

import { ModuleCompletionStatus, useGetMainPageProgressQuery } from '@/api/endpoints/progress';
import Breadcrumbs from '@/components/Breadcrumbs';
import CardWrapper from '@/components/CardWrapper';
import CourseListItem from '@/components/CourseListItem';
import { CourseListItemStatus } from '@/components/CourseListItem/const';
import ProgressCard from '@/components/ProgressCard';
import { ProgressStatus } from '@/components/ProgressCard/const';
import StatisticsChart from '@/components/StatisticsChart';
import { Text } from '@/components/Typography';
import { ROUTES } from '@/const/routes';
import { useRouter, useTranslation } from '@/hooks';

import { constants, ModuleStatus } from './const';

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
  if (apiStatus === ModuleCompletionStatus.Blocked) {
    return ModuleStatus.Blocked;
  }

  if (apiStatus === ModuleCompletionStatus.Completed) {
    return ModuleStatus.Completed;
  }

  if (completedLessons > 0) {
    return ModuleStatus.InProgress;
  }

  return ModuleStatus.NotStarted;
};

const mapModuleStatusToCourseListItemStatus = (status: ModuleStatus): CourseListItemStatus => {
  switch (status) {
    case ModuleStatus.Blocked:
      return CourseListItemStatus.Blocked;
    case ModuleStatus.Completed:
      return CourseListItemStatus.Completed;
    case ModuleStatus.InProgress:
      return CourseListItemStatus.InProgress;
    case ModuleStatus.NotStarted:
      return CourseListItemStatus.NotStarted;
    default:
      return CourseListItemStatus.NotStarted;
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
          status={ProgressStatus.Continue}
          onClick={() => currentModule && router.push(`${ROUTES.USER_MODULES}/${currentModule.id}`)}
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
                        moduleStatus !== ModuleStatus.Blocked &&
                        router.push(`${ROUTES.USER_MODULES}/${module.id}`)
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
