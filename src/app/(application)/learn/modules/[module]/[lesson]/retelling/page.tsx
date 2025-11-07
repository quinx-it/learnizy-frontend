'use client';

import { useParams } from 'next/navigation';
import { FC } from 'react';

import LessonRetellingPage from '@/components/LessonRetellingPage';

import { ParamsType } from '../../../typings';

const LessonRetelling: FC = () => {
  const params = useParams<ParamsType>();
  const { module, lesson } = params;

  return <LessonRetellingPage module={module} lesson={lesson} />;
};

export default LessonRetelling;
