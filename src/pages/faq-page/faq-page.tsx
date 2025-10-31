'use client';

import { CardWrapper } from '@/shared/components/card-wrapper';
import { routes } from '@/shared/constants';
import { CardAccordion } from '@/shared/ui/accordion';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import { Text } from '@/shared/ui/typography';
import React from 'react';
import { constants } from './constants';
import { globalConstants } from '@/shared/constants/constants';
import { useTranslation } from 'react-i18next';

export const FaqPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Breadcrumbs
        rootLabel={t(globalConstants.rootBreadcrumbLabels.knowlegeBaseLabel)}
        rootHref={routes.user.knowlegeBase}
        items={constants.breadCrumbs}
      />
      <CardWrapper className="max-w-full">
        <div>
          <Text variant="m-bold" className="text-medium mb-5">
            {t('COMMON.FAQ_ANSWERS_TO_POPULAR_QUESTIONS')}
          </Text>
          <hr className="border-gray mb-4" />
          <div className="w-full">
            <CardAccordion className="w-full" items={constants.accordionItems} />
          </div>
        </div>
      </CardWrapper>
    </>
  );
};
