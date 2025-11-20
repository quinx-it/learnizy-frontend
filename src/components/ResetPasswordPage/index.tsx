import { FC, useState } from 'react';

import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import CardWrapper from '@/components/CardWrapper';
import { Logo } from '@/components/Icons';
import { Heading, Text } from '@/components/Typography';

import { IResetPasswordPageProps } from './typings';

import {
  CardWrapperContainer,
  Container,
  HeadingWrapper,
  LogoWrapper,
  TextWrapper,
} from './styles';

const ResetPasswordPage: FC<IResetPasswordPageProps> = (props) => {
  const { token } = props;
  const [isSuccess, setIsSuccess] = useState(false);

  return (
    <Container>
      <CardWrapperContainer>
        <CardWrapper>
          <LogoWrapper>
            <Logo />
          </LogoWrapper>
          {!isSuccess && (
            <>
              <HeadingWrapper>
                <Heading variant="xl">Создайте новый пароль</Heading>
              </HeadingWrapper>
              <TextWrapper>
                <Text variant="m">
                  Чтобы завершить восстановление, придумайте новый надежный пароль для вашего
                  аккаунта.
                </Text>
              </TextWrapper>
            </>
          )}
          <ResetPasswordForm token={token} onSuccess={() => setIsSuccess(true)} />
        </CardWrapper>
      </CardWrapperContainer>
    </Container>
  );
};

export default ResetPasswordPage;
