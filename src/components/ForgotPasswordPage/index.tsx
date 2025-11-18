import { FC } from 'react';

import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import CardWrapper from '@/components/CardWrapper';
import { Logo } from '@/components/Icons';
import { Heading, Text } from '@/components/Typography';

import {
  CardWrapperContainer,
  Container,
  HeadingWrapper,
  LogoWrapper,
  TextWrapper,
} from './styles';

const ForgotPasswordPage: FC = () => {
  return (
    <Container>
      <CardWrapperContainer>
        <CardWrapper>
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
          <HeadingWrapper>
            <Heading variant="xl">Забыли пароль?</Heading>
          </HeadingWrapper>
          <TextWrapper>
            <Text variant="m">
              Не волнуйтесь! Просто укажите ваш email, и мы вышлем ссылку для сброса пароля.
            </Text>
          </TextWrapper>
          <ForgotPasswordForm />
        </CardWrapper>
      </CardWrapperContainer>
    </Container>
  );
};

export default ForgotPasswordPage;
