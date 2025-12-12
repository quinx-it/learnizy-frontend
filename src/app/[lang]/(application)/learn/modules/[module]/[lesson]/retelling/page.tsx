'use client';

import { useParams } from 'next/navigation';
import { type FC } from 'react';

import LessonRetellingPage from '@/components/LessonRetellingPage';

import { type ParamsType } from '../../../typings';

const LessonRetelling: FC = () => {
  const params = useParams<ParamsType>();
  const { module, lesson } = params;

  return <LessonRetellingPage module={module} lesson={lesson} />;
};

export default LessonRetelling;
