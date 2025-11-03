'use client';

import { LessonRetellingPage } from '@/shared/appPages/LessonRetellingPage';
import { useParams } from 'next/navigation';

import { ParamsType } from '../../../typings';

const LessonRetelling = () => {
  const params = useParams<ParamsType>();
  const { module, lesson } = params;

  return <LessonRetellingPage module={module} lesson={lesson} />;
};

export default LessonRetelling;
