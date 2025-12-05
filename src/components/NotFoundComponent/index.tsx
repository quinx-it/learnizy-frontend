'use client';

import Image from 'next/image';
import { FC } from 'react';

import { defaultPage, routes } from '@/const';
import { useTranslation } from '@/hooks';
import { useAppSelector } from '@/hooks/redux';
import { selectUserRole } from '@/store/slices/auth/selectors';

import { NotFoundComponentPropsType } from './typings';

import {
  AstronautImage,
  Container,
  NotFoundNumber,
  NotFoundTitle,
  StyledButton,
  StyledLinkButton,
} from './styles';

const NotFoundComponent: FC<NotFoundComponentPropsType> = (props) => {
  const { className } = props;

  const { t } = useTranslation();

  const role = useAppSelector(selectUserRole);

  const defaultUrl = role && defaultPage[role] ? defaultPage[role] : routes.public.loginPage;

  return (
    <Container className={className}>
      <NotFoundNumber>404</NotFoundNumber>
      <NotFoundTitle tag="h2" variant="2xl">
        {t('COMMON.NOT_FOUND_TITLE')}
      </NotFoundTitle>
      <AstronautImage>
        <Image width={192} height={207} src="/images/notfound-astronaut.webp" alt="astronaut" />
      </AstronautImage>
      <StyledLinkButton href={defaultUrl}>
        <StyledButton>{t('COMMON.GO_HOME')}</StyledButton>
      </StyledLinkButton>
    </Container>
  );
};

export default NotFoundComponent;
