import { BlockRenderer } from '@/shared/components/content-block-parser/content-block-parser';
import React from 'react';
import { api } from './constants';

interface LessonItemPageProps {
  id: string;
}

export const LessonItemPage: React.FC<LessonItemPageProps> = ({ id }) => {
  return (
    <div className="flex flex-col">
      <h1>{id}</h1>
      {api.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </div>
  );
};
