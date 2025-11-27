'use client';

import { FC } from 'react';

import CardAccordion from '@/components/Accordion';
import Breadcrumbs from '@/components/Breadcrumbs';
import CardWrapper from '@/components/CardWrapper';
import { routes } from '@/constants';
import { globalConstants } from '@/constants/constants';
import { useTranslation } from '@/hooks';

import { constants } from './constants';

import { AccordionContainer, Divider, StyledCardWrapper, Title } from './styles';

const FaqPage: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Breadcrumbs
        rootLabel={t(globalConstants.rootBreadcrumbLabels.knowlegeBaseLabel)}
        rootHref={routes.user.knowlegeBase}
        items={constants.breadCrumbs}
      />
      <StyledCardWrapper>
        <CardWrapper>
          <Title>{t('COMMON.FAQ_ANSWERS_TO_POPULAR_QUESTIONS')}</Title>
          <Divider />
          <AccordionContainer>
            <CardAccordion items={constants.accordionItems} />
          </AccordionContainer>
        </CardWrapper>
      </StyledCardWrapper>
    </>
  );
};

export default FaqPage;
