import { CardWrapper } from '@/shared/components/card-wrapper';
import { routes } from '@/shared/constants';
import { CardAccordion } from '@/shared/ui/accordion';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import { Text } from '@/shared/ui/typography';
import React from 'react';
import { constants } from './constants';

export const FaqPage = () => {
  return (
    <>
      <Breadcrumbs
        rootLabel={routes.knowlegeBaseLabel}
        rootHref={routes.knowlegeBase}
        items={constants.breadCrumbs}
      />
      <CardWrapper className='max-w-full'>
        <div>
          <Text variant='m-bold' className='text-medium mb-5'>Ответы на популярные вопросы</Text>
          <hr className='border-gray mb-4' />
          <div className='w-full'>
            <CardAccordion className='w-full' items={constants.accordionItems} />
          </div>
        </div>
      </CardWrapper>
    </>
  );
};
