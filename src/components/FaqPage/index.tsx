'use client';

import { type FC } from 'react';

import CardAccordion from '@/components/Accordion';
import Breadcrumbs from '@/components/Breadcrumbs';
import CardWrapper from '@/components/CardWrapper';
import { ROUTES } from '@/const';
import { GLOBAL_CONSTANTS } from '@/const/constants';
import { useTranslation } from '@/hooks';

import { createConstants } from './const';

import { AccordionContainer, Divider, StyledCardWrapper, Title } from './styles';

const FaqPage: FC = () => {
  const { t } = useTranslation();
  const constants = createConstants(t);

  return (
    <>
      <Breadcrumbs
        rootLabel={t(GLOBAL_CONSTANTS.rootBreadcrumbLabels.knowlegeBaseLabel)}
        rootHref={ROUTES.user.knowlegeBase}
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
