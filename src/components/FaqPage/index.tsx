'use client';

import { FC } from 'react';

import CardAccordion from '@/components/Accordion';
import Breadcrumbs from '@/components/Breadcrumbs';
import CardWrapper from '@/components/CardWrapper';
import { Text } from '@/components/Typography';
import { routes } from '@/const';
import { globalConstants } from '@/const/constants';
import { useTranslation } from '@/hooks';

import { constants } from './constants';

const FaqPage: FC = () => {
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

export default FaqPage;
