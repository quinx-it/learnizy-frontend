'use client';

import { useParams } from 'next/navigation';

import { LessonItemPage } from '@/appPages/LessonItemPage';

import { ParamsType } from '../../typings';

const LessonItem = () => {
  const params = useParams<ParamsType>();
  const { lesson, module } = params;

  return <LessonItemPage lessonId={lesson} moduleId={module} />;
};

export default LessonItem;
