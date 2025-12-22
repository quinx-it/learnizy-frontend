'use client';

import Image from 'next/image';
import { type FC } from 'react';

import { Text } from '@/components/Typography';
import { useTranslation } from '@/hooks';

import { type AccordionReviewPropsType } from './typings';

import {
  IconClose,
  IconOpen,
  IconWrapper,
  StyledAccordion,
  StyledAccordionContent,
  StyledAccordionItem,
  StyledAccordionTrigger,
  MediumText,
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
              <MediumText tag="span">
                {messageNumber} {t('ACCORDION_REVIEW.NEW_MESSAGES')}
              </MediumText>
            </Text>
            <IconWrapper>
              <IconOpen>
                <Image
                  src="/images/arrow-right-icon.svg"
                  alt="Arrow right"
                  width={16}
                  height={16}
                />
              </IconOpen>
              <IconClose>
                <Image
                  src="/images/arrow-right-icon.svg"
                  alt="Arrow right"
                  width={16}
                  height={16}
                />
              </IconClose>
            </IconWrapper>
          </StyledAccordionTrigger>
          <StyledAccordionContent>
            <Text>{content}</Text>
          </StyledAccordionContent>
        </StyledAccordionItem>
      ))}
    </StyledAccordion>
  );
};

export default AccordionReview;
