import Image from 'next/image';
import { FC, useState } from 'react';

import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import CardWrapper from '@/components/CardWrapper';
import { Heading, Text } from '@/components/Typography';
import { useTranslation } from '@/hooks';

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
  const { t } = useTranslation();

  return (
    <Container>
      <CardWrapperContainer>
        <CardWrapper>
          <LogoWrapper>
            <Image src="/images/logo.svg" alt="Logo" width={200} height={70} />
          </LogoWrapper>
          {!isSuccess && (
            <>
              <HeadingWrapper>
                <Heading variant="xl">{t('RESET_PASSWORD.CREATE_NEW_PASSWORD')}</Heading>
              </HeadingWrapper>
              <TextWrapper>
                <Text variant="m">{t('RESET_PASSWORD.DESCRIPTION')}</Text>
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
