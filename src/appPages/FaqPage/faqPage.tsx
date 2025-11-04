'use client';

import { CardWrapper } from '@/components/CardWrapper';
import { routes } from '@/constants';
import { CardAccordion } from '@/ui/accordion';
import { Breadcrumbs } from '@/ui/breadcrumbs';
import { Text } from '@/ui/typography';
import React from 'react';
import { globalConstants } from '@/constants/constants';
import { useTranslation } from 'react-i18next';
import { constants } from './constants';
import Page from '@/components/Page';

export const FaqPage = () => {
  const { t } = useTranslation();

  return (
    <Page key="FAQ_PAGE_SEO">
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
    </Page>
  );
};
