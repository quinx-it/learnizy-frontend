'use client';

import { useParams } from 'next/navigation';

import { LessonTestResultPage } from '@/appPages/LessonTestResultPage';

import { ParamsType } from '../../../typings';

const LessonTestResult = () => {
  const params = useParams<ParamsType>();
  const { module, lesson } = params;

  return <LessonTestResultPage moduleId={module} lessonId={lesson} />;
};

export default LessonTestResult;
