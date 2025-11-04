'use client';
import { LessonItemPage } from '@/shared/appPages/LessonItemPage';
import { useParams } from 'next/navigation';
import { ParamsType } from '../../typings';

const LessonItem = () => {
  const params = useParams<ParamsType>();
  const { lesson, module } = params;

  return <LessonItemPage lessonId={lesson} moduleId={module} />;
};

export default LessonItem;
