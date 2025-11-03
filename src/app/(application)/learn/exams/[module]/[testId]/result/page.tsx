'use client';
import { ExamTestResultPage } from '@/shared/appPages/ExamTestResultPage';
import { useParams } from 'next/navigation';
import { ParamsType } from '../../../typings';

const LessonTestResult = () => {
  const params = useParams<ParamsType>();
  const { module, testId } = params;

  return <ExamTestResultPage testId={testId} moduleId={module} />;
};

export default LessonTestResult;
