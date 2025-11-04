'use client';
import { LessonTestResultPage } from '@/shared/appPages/LessonTestResultPage';
import { useParams } from 'next/navigation';
import { ParamsType } from '../../../typings';

const LessonTestResult = () => {
  const params = useParams<ParamsType>();
  const { module, lesson } = params;

  return <LessonTestResultPage moduleId={module} lessonId={lesson} />;
};

export default LessonTestResult;
