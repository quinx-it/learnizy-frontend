'use client';

import { useParams } from 'next/navigation';
import { type FC } from 'react';

import LessonItemPage from '@/components/LessonItemPage';

import { type ParamsType } from '../../typings';

const LessonItem: FC = () => {
  const params = useParams<ParamsType>();
  const { lesson, module } = params;

  return <LessonItemPage lessonId={lesson} moduleId={module} />;
};

export default LessonItem;
