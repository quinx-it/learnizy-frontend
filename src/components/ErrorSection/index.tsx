'use client';

import Image from 'next/image';
import { type FC } from 'react';

import { useTranslation } from '@/hooks';

import { type ErrorPropsType, type ErrorType } from './typings';

import {
  Container,
  ContentWrapper,
  Description,
  ImageWrapper,
  StyledButton,
  TextContainer,
  Title,
} from './styles';

const ErrorSection: FC<ErrorPropsType & ErrorType> = (props) => {
  const { t } = useTranslation();

  const { className, reset } = props;

  const handleError = () => {
    reset();
  };

  return (
    <Container>
      <ContentWrapper className={className}>
        <ImageWrapper>
          <Image width={110} height={105} src="/images/error-astronaut.webp" alt="astronaut" />
        </ImageWrapper>
        <TextContainer>
          <Title>{t('ERROR_SECTION.TITLE')}</Title>
          <Description>{t('ERROR_SECTION.TEXT')}</Description>
        </TextContainer>
        <StyledButton onClick={handleError}>{t('ERROR_SECTION.BUTTON')}</StyledButton>
      </ContentWrapper>
    </Container>
  );
};

export default ErrorSection;
