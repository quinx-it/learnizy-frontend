'use client';
import { LessonItemPage } from '@/pages/lesson-item-page';
import { useParams } from 'next/navigation';
import { ParamsType } from '../../typings';

const LessonItem = () => {
  const params = useParams<ParamsType>();
  const { lesson, module } = params;

  return <LessonItemPage lessonId={lesson} moduleId={module} />;
};

export default LessonItem;
