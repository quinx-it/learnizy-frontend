'use client';
import { LessonItemPage } from '@/shared/app-pages/lesson-item-page'
import { useParams } from 'next/navigation';

type ParamsType = {
  lesson: string;
}

const LessonItem = () => {
  const params = useParams<ParamsType>();
  const { lesson } = params;

  return <LessonItemPage id={lesson} />;
};

export default LessonItem;
