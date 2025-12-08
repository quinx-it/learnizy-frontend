import Image from 'next/image';
import { FC } from 'react';

import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import CardWrapper from '@/components/CardWrapper';
import { Heading, Text } from '@/components/Typography';
import { useTranslation } from '@/hooks';

import {
  CardWrapperContainer,
  Container,
  HeadingWrapper,
  LogoWrapper,
  TextWrapper,
} from './styles';

const ForgotPasswordPage: FC = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <CardWrapperContainer>
        <CardWrapper>
          <LogoWrapper>
            <Image src="/images/logo.svg" alt="Logo" width={200} height={70} />
          </LogoWrapper>
          <HeadingWrapper>
            <Heading variant="xl">{t('FORGOT_PASSWORD.TITLE')}</Heading>
          </HeadingWrapper>
          <TextWrapper>
            <Text variant="m">{t('FORGOT_PASSWORD.DESCRIPTION')}</Text>
          </TextWrapper>
          <ForgotPasswordForm />
        </CardWrapper>
      </CardWrapperContainer>
    </Container>
  );
};

export default ForgotPasswordPage;
