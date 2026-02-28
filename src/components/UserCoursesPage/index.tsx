'use client';

import { type FC, useMemo } from 'react';

import { useGetCoursesQuery } from '@/api/endpoints/admin';
import Breadcrumbs from '@/components/Breadcrumbs';
import { CourseCard } from '@/components/CourseCard';
import ErrorSection from '@/components/ErrorSection';
import FullscreenLoader from '@/components/FullscreenLoader';
import { ROUTES } from '@/const/routes';
import { useTranslation } from '@/hooks';

import { CourseCardWrapper, CoursesGrid, PageContainer } from './styles';

const UserCoursesPage: FC = () => {
  const { t } = useTranslation();

  const queryParams = useMemo(() => ({ page: 0, size: 20 }), []);

  const { data: coursesData, isLoading, isError, refetch } = useGetCoursesQuery(queryParams);

  if (isLoading) return <FullscreenLoader />;

  if (isError) return <ErrorSection reset={refetch} />;

  const breadcrumbsRootLabel = t('BREADCRUMBS.COURSES');
  const breadcrumbsRootHref = ROUTES.USER_COURSES;
  const breadcrumbsRootDescription = t('BREADCRUMBS.USER_COURSES_DESC');

  return (
    <PageContainer>
      <Breadcrumbs
        rootLabel={breadcrumbsRootLabel}
        rootHref={breadcrumbsRootHref}
        rootDescription={breadcrumbsRootDescription}
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
