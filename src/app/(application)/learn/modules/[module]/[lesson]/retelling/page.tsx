'use client';

import { LessonRetellingPage } from '@/shared/app-pages/lesson-retelling-page';
import { useParams } from 'next/navigation';

type ParamsType = {
  module: string;
  lesson: string;
};

const LessonRetelling = () => {
  const params = useParams<ParamsType>();
  const { lesson } = params;

  return <LessonRetellingPage lesson={lesson} />;
};

export default LessonRetelling;
