'use client';

import { type FC } from 'react';

import LanguageSwitcher from '@/components/LanguageSwitcher';
import LinkButton from '@/components/LinkButton';
import { ROUTES } from '@/const';
import { useTranslation } from '@/hooks';

import { HeaderBand, HeaderInner, SignInLink, SwitcherSlot } from './styles';

const LandingHeader: FC = () => {
  const { t } = useTranslation();

  return (
    <HeaderBand>
      <HeaderInner>
        <SwitcherSlot>
          <LanguageSwitcher />
        </SwitcherSlot>

        <SignInLink href={ROUTES.LOGIN_PAGE}>{t('LANDING.HEADER.SIGN_IN')}</SignInLink>

        <LinkButton href={ROUTES.REGISTER_PAGE} variant="yellow" size="medium">
          {t('LANDING.HEADER.SIGN_UP')}
        </LinkButton>
      </HeaderInner>
    </HeaderBand>
  );
};

export default LandingHeader;
