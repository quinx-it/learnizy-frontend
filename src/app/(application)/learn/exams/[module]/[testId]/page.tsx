'use client';
import { LessonTestPage } from '@/shared/app-pages/lesson-test-page';
import { useParams } from 'next/navigation';
import { useGetExamByIdQuery } from '@/api/endpoints/exams';

type ParamsType = {
  module: string;
  testId: string;
};

const ExamPage = () => {
  const params = useParams<ParamsType>();
  const { module, testId } = params;

  return <LessonTestPage lessonId={testId} moduleId={module} fetchTestData={useGetExamByIdQuery} />;
};

export default ExamPage;
