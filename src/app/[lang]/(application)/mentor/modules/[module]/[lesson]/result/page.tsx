'use client';

import { useParams } from 'next/navigation';
import { type FC } from 'react';

import LessonTestResultPage from '@/components/LessonTestResultPage';

import { type ParamsType } from '../../../typings';

const LessonTestResult: FC = () => {
  const params = useParams<ParamsType>();
  const { module, lesson } = params;

  return <LessonTestResultPage moduleId={module} lessonId={lesson} />;
};

export default LessonTestResult;
