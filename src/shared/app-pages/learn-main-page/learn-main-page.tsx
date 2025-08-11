import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import React from 'react';
import { constants } from './constants';

export const LearnMainPage = () => {
  return (
    <>
      <Breadcrumbs rootDescription={constants.main.description} />
    </>
  );
};
