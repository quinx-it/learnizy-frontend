'use client';

import { LessonRetellingPage } from '@/pages/lesson-retelling-page';
import { NotFoundPage } from '@/pages/notFound-page';
import { useParams } from 'next/navigation';
import { ParamsType } from '../../../typings';

const LessonRetelling = () => {
  const params = useParams<ParamsType>();

  if (!params || !params.module || !params.lesson) {
    return <NotFoundPage />;
  }

  const { module, lesson } = params;

  return <LessonRetellingPage module={module} lesson={lesson} />;
};

export default LessonRetelling;
