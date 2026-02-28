'use client';

import { useParams } from 'next/navigation';
import { type FC } from 'react';

import { type ParamsType } from '@/app/[lang]/(application)/learn/courses/typings';
import ModulesPage from '@/components/ModulesPage';

const CourseModules: FC = () => {
  const params = useParams<ParamsType>();
  const { courseId: courseIdParam } = params;
  const courseId = Number(courseIdParam);

  if (Number.isNaN(courseId)) {
    return null;
  }

  return <ModulesPage courseId={courseId} />;
};

export default CourseModules;
