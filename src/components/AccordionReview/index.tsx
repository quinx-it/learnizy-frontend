'use client';

import { FC } from 'react';

import { ArrowRightIcon } from '@/components/Icons';
import { Text } from '@/components/Typography';
import { useTranslation } from '@/hooks';

import '@/components/Accordion/accordion.css';
import { AccordionReviewPropsType } from './typings';

import {
  IconClose,
  IconOpen,
  IconWrapper,
  StyledAccordion,
  StyledAccordionContent,
  StyledAccordionItem,
  StyledAccordionTrigger,
} from './styles';

const AccordionReview: FC<AccordionReviewPropsType> = (props) => {
  const { items } = props;

  const { t } = useTranslation();

  return (
    <StyledAccordion type="single" collapsible>
      {items.map(({ value, number, messageNumber, content }) => (
        <StyledAccordionItem key={value} value={value}>
          <StyledAccordionTrigger>
            <Text>
              {t('ACCORDION_REVIEW.MODULE')} {number} -{' '}
              <Text tag="span" className="text-medium">
                {messageNumber} {t('ACCORDION_REVIEW.NEW_MESSAGES')}
              </Text>
            </Text>
            <IconWrapper>
              <IconOpen>
                <ArrowRightIcon color="blue" />
              </IconOpen>
              <IconClose>
                <ArrowRightIcon color="blue" />
              </IconClose>
            </IconWrapper>
          </StyledAccordionTrigger>
          <StyledAccordionContent className="accordion-content">
            <Text>{content}</Text>
          </StyledAccordionContent>
        </StyledAccordionItem>
      ))}
    </StyledAccordion>
  );
};

export default AccordionReview;
