'use client';

import { FC } from 'react';

import { Text } from '@/components/Typography';
import { useTranslation } from '@/hooks';

import { WorkingSectionPropsType } from './typings';

import { Container, ContentWrapper, StyledImage, TextWrapper } from './styles';

const WorkingSection: FC<WorkingSectionPropsType> = (props) => {
  const { className } = props;

  const { t } = useTranslation();

  return (
    <Container>
      <ContentWrapper className={className}>
        <StyledImage width={110} height={105} src="/images/astronaut1.webp" alt="astronaut" />
        <TextWrapper>
          <Text variant="l">{t('COMMON.COMING_SOON_TEXT')}</Text>
        </TextWrapper>
      </ContentWrapper>
    </Container>
  );
};

export default WorkingSection;
