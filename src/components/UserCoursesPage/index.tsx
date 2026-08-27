'use client';

import { type FC } from 'react';

import { useGetCoursesQuery } from '@/api/endpoints/admin';
import Breadcrumbs from '@/components/Breadcrumbs';
import { CourseCard } from '@/components/CourseCard';
import ErrorSection from '@/components/ErrorSection';
import FullscreenLoader from '@/components/FullscreenLoader';
import { ROUTES } from '@/const/routes';
import { useTranslation } from '@/hooks';

import { CourseCardWrapper, CoursesGrid, PageContainer } from './styles';

const USER_COURSES_QUERY_PARAMS = { page: 0, size: 20 };

const UserCoursesPage: FC = () => {
  const { t } = useTranslation();

  const {
    data: coursesData,
    isLoading,
    isError,
    refetch,
  } = useGetCoursesQuery(USER_COURSES_QUERY_PARAMS);

  if (isLoading) return <FullscreenLoader />;

  if (isError) return <ErrorSection reset={refetch} />;

  return (
    <PageContainer>
      <Breadcrumbs
        rootLabel={t('BREADCRUMBS.COURSES')}
        rootHref={ROUTES.USER_COURSES}
        rootDescription={t('BREADCRUMBS.USER_COURSES_DESC')}
      />
      <CoursesGrid>
        {(coursesData?.content || []).map((course) => (
          <CourseCardWrapper key={course.id}>
            <CourseCard {...course} detailsBaseRoute={ROUTES.USER_COURSES} />
          </CourseCardWrapper>
        ))}
      </CoursesGrid>
    </PageContainer>
  );
};

export default UserCoursesPage;
