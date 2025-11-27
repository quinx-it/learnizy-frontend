'use client';

import { Box } from '@mui/material';
import { FC } from 'react';

import { useGetMainPageProgressQuery } from '@/api/endpoints/progress';
import Breadcrumbs from '@/components/Breadcrumbs';
import CardWrapper from '@/components/CardWrapper';
import CourseListItem from '@/components/CourseListItem';
import ProgressCard from '@/components/ProgressCard';
import { ProgressStatus } from '@/components/ProgressCard/constants';
import StatisticsChart from '@/components/StatisticsChart';
import { Text } from '@/components/Typography';
import { routes } from '@/const';
import { useRouter, useTranslation } from '@/hooks';

import { constants } from './constants';

import {
  Container,
  CourseDivider,
  CourseTitle,
  ModulesList,
  StatisticsDivider,
  StatisticsTitle,
} from './styles';

const LearnMainPage: FC = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const { data: mainPageProgress, error } = useGetMainPageProgressQuery();

  if (error || !mainPageProgress) return null;

  const currentModule = mainPageProgress.modules.find(
    (mod) => mod.id === mainPageProgress.courseInfo.currentModuleId,
  );

  return (
    <>
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
              <Text variant="m-bold">
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
                let status: keyof typeof constants.statuses = 'NOT_STARTED';

                if (module.completionStatus === 'BLOCKED') {
                  status = 'BLOCKED';
                } else if (module.completionStatus === 'COMPLETED') {
                  status = 'COMPLETED';
                } else if (module.completedLessons > 0) {
                  status = 'IN_PROGRESS';
                }

                return (
                  <li key={module.id}>
                    <CourseListItem
                      number={module.sequenceNumber}
                      title={module.title}
                      status={status}
                      progress={moduleProgress}
                      onClick={() =>
                        status !== 'BLOCKED' && router.push(`${routes.user.modules}/${module.id}`)
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
    </>
  );
};

export default LearnMainPage;
