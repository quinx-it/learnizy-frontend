'use client';

import { Box } from '@mui/material';
import { type FC, useMemo } from 'react';

import { useGetCourseQuery } from '@/api/endpoints/courses';
import { useGetModulesQuery } from '@/api/endpoints/modules';
import { CompletionStatus } from '@/api/endpoints/types';
import Breadcrumbs from '@/components/Breadcrumbs';
import CardWrapper from '@/components/CardWrapper';
import CourseListItem from '@/components/CourseListItem';
import { CourseListItemStatus } from '@/components/CourseListItem/const';
import ErrorSection from '@/components/ErrorSection';
import FullscreenLoader from '@/components/FullscreenLoader';
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
  MediumText,
} from './styles';

const COURSE_ID = 2;

const mapCompletionStatusToModuleStatus = (
  apiStatus: CompletionStatus,
  completedLessons: number,
): ModuleStatus => {
  if (apiStatus === CompletionStatus.Blocked) {
    return ModuleStatus.Blocked;
  }

  if (apiStatus === CompletionStatus.Completed) {
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

  const {
    data: courseData,
    isLoading: isCourseLoading,
    isError: isCourseError,
    refetch: refetchCourse,
  } = useGetCourseQuery(COURSE_ID);

  const {
    data: modulesData,
    isLoading: isModulesLoading,
    isError: isModulesError,
    refetch: refetchModules,
  } = useGetModulesQuery(COURSE_ID);

  const courseProgress = useMemo(() => {
    if (!modulesData) {
      return {
        totalModules: 0,
        completedModules: 0,
        totalLessons: 0,
        completedLessons: 0,
        currentModuleId: null,
      };
    }

    const totalModules = modulesData.length;
    const completedModules = modulesData.filter(
      (m) => m.completionStatus === CompletionStatus.Completed,
    ).length;
    const totalLessons = modulesData.reduce((sum, m) => sum + m.totalLessons, 0);
    const completedLessons = modulesData.reduce((sum, m) => sum + m.completedLessons, 0);

    const currentModule =
      modulesData.find(
        (m) =>
          m.completionStatus === CompletionStatus.InProgress ||
          (m.completionStatus !== CompletionStatus.Completed && m.completedLessons > 0),
      ) ||
      modulesData.find((m) => m.completionStatus === CompletionStatus.NotStarted) ||
      modulesData[0];

    return {
      totalModules,
      completedModules,
      totalLessons,
      completedLessons,
      currentModuleId: currentModule?.id || null,
    };
  }, [modulesData]);

  const currentModule = useMemo(() => {
    if (!modulesData || !courseProgress.currentModuleId) return null;

    return modulesData.find((m) => m.id === courseProgress.currentModuleId);
  }, [modulesData, courseProgress.currentModuleId]);

  const sortedModules = useMemo(() => {
    if (!modulesData) return [];

    return [...modulesData].sort((a, b) => a.sequenceOrder - b.sequenceOrder);
  }, [modulesData]);

  if (isCourseLoading || isModulesLoading) return <FullscreenLoader />;

  if (isCourseError || isModulesError) {
    return (
      <ErrorSection
        reset={() => {
          refetchCourse();
          refetchModules();
        }}
      />
    );
  }

  if (!courseData || !modulesData) return null;

  return (
    <Box>
      <Breadcrumbs rootDescription={courseData.title || ''} />

      <Container>
        <ProgressCard
          title={t(constants.titles.currentCourse)}
          subTitle={courseData.title || ''}
          modules={courseProgress.completedModules}
          totalLessons={courseProgress.totalLessons}
          totalModules={courseProgress.totalModules}
          lessons={courseProgress.completedLessons}
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
                <MediumText tag="span" variant="m-bold">
                  {courseData.title}
                </MediumText>
              </Text>
            </CourseTitle>
            <CourseDivider />
            <ModulesList>
              {sortedModules.map((module, index) => {
                const moduleProgress =
                  module.totalLessons > 0
                    ? (module.completedLessons / module.totalLessons) * 100
                    : 0;

                let shouldBlock = false;

                if (index > 0) {
                  const prevModule = sortedModules[index - 1];

                  if (prevModule.completionStatus !== CompletionStatus.Completed) {
                    shouldBlock = true;
                  }
                }

                const actualStatus = shouldBlock
                  ? CompletionStatus.Blocked
                  : module.completionStatus;
                const moduleStatus = mapCompletionStatusToModuleStatus(
                  actualStatus,
                  module.completedLessons,
                );
                const courseListItemStatus = mapModuleStatusToCourseListItemStatus(moduleStatus);

                return (
                  <li key={module.id}>
                    <CourseListItem
                      number={module.sequenceOrder}
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
            <StatisticsChart weeklyActivity={[]} />
          </Box>
        </CardWrapper>
      </Container>
    </Box>
  );
};

export default LearnMainPage;
