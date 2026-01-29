'use client';

import { useParams } from 'next/navigation';
import { type FC } from 'react';

import { type ParamsType } from '@/app/[lang]/(application)/mentor/courses/typings';
import ModuleItemPage from '@/components/ModulesItemPage';

const CourseModuleItem: FC = () => {
  const params = useParams<ParamsType>();
  const { courseId: courseIdParam, moduleId } = params;
  const courseId = Number(courseIdParam);

  if (Number.isNaN(courseId) || !moduleId) {
    return null;
  }

  return <ModuleItemPage id={moduleId} courseId={courseId} />;
};

export default CourseModuleItem;
