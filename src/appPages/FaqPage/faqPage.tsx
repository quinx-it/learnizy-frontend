'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

import { CardAccordion } from '@/components/Accordion';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { CardWrapper } from '@/components/CardWrapper';
import Page from '@/components/Page';
import { Text } from '@/components/Typography';
import { routes } from '@/constants';
import { globalConstants } from '@/constants/constants';

import { constants } from './constants';

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
