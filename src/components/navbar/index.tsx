'use client';

import Image from 'next/image';
import { useEffect, useState, type FC } from 'react';

import LanguageSwitcher from '@/components/LanguageSwitcher';
import { type INavbarProps } from '@/components/navbar/typings';
import Spinner from '@/components/Spinner';
import { Text } from '@/components/Typography';
import { ROUTES } from '@/const/routes';
import { useTranslation } from '@/hooks';
import { useLogout } from '@/hooks/useLogout';

import NavbarLink from './NavbarLink';

import {
  IconWrapper,
  LanguageSwitcherContainer,
  LinksContainer,
  LogoLink,
  LogoImageMdOnly,
  LogoImageMobileAndLg,
  LogoutButton,
  LogoutButtonText,
  MobileCloseButton,
  MobileLanguageSwitcherContainer,
  MobileLinksContainer,
  MobileLogoLink,
  MobileLogoutButton,
  MobileLogoutButtonText,
  MobileLogoutContainer,
  MobileMenuButtonWrapper,
  MobileMenuContainer,
  MobileMenuHeader,
  NavbarContainer,
  Overlay,
  SpinnerWrapper,
  StyledMobileMenuButton,
} from './styles';

const Navbar: FC<INavbarProps> = (props) => {
  const { links } = props;

  const { handleLogout, isLoading } = useLogout();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  return (
    <>
      <MobileMenuButtonWrapper>
        <StyledMobileMenuButton onClick={() => setIsOpen(!isOpen)}>
          <Image src="/images/cubes-main-icon.svg" alt="Menu icon" width={20} height={20} />
        </StyledMobileMenuButton>
      </MobileMenuButtonWrapper>

      <NavbarContainer>
        <LogoLink href={ROUTES.USER_HOME_PAGE}>
          <LogoImageMdOnly src="/images/header-logo-mobile.svg" alt="Logo" width={44} height={44} />
          <LogoImageMobileAndLg
            src="/images/header-logo-desktop.svg"
            alt="Logo"
            width={170}
            height={70}
          />
        </LogoLink>

        <LinksContainer>
          {links.map(({ href, src, label }) => (
            <NavbarLink key={label} href={href} src={src || ''} label={t(label)} />
          ))}
        </LinksContainer>

        <LanguageSwitcherContainer>
          <LanguageSwitcher fullWidth />
        </LanguageSwitcherContainer>

        <LogoutButton onClick={handleLogout}>
          {isLoading ? (
            <SpinnerWrapper>
              <Spinner type="ring" size={16} />
            </SpinnerWrapper>
          ) : (
            <>
              <IconWrapper>
                <Image src="/images/exit-icon.svg" alt="Exit icon" width={16} height={16} />
              </IconWrapper>
              <LogoutButtonText>
                <Text variant="s" tag="span">
                  {t('COMMON.BUTTON_LOGOUT')}
                </Text>
              </LogoutButtonText>
            </>
          )}
        </LogoutButton>
      </NavbarContainer>

      <Overlay
        isOpen={isOpen}
        role="button"
        tabIndex={isOpen ? 0 : -1}
        aria-hidden={!isOpen}
        aria-label={t('COMMON_LABELS.CLOSE')}
        onClick={() => setIsOpen(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') setIsOpen(false);
        }}
      />
      <MobileMenuContainer isOpen={isOpen} aria-hidden={!isOpen}>
        <MobileMenuHeader>
          <MobileLogoLink href={ROUTES.USER_HOME_PAGE} onClick={() => setIsOpen(false)}>
            <Image src="/images/header-logo-desktop.svg" alt="Logo" width={150} height={52} />
          </MobileLogoLink>

          <MobileCloseButton onClick={() => setIsOpen(false)} aria-label={t('COMMON_LABELS.CLOSE')}>
            <Image src="/images/cross-icon.svg" alt="" width={16} height={16} />
          </MobileCloseButton>
        </MobileMenuHeader>

        <MobileLinksContainer>
          {links.map(({ href, src, label }) => (
            <NavbarLink
              key={label}
              href={href}
              src={src || ''}
              label={t(label)}
              onClick={() => setIsOpen(false)}
            />
          ))}
        </MobileLinksContainer>

        <MobileLanguageSwitcherContainer>
          <LanguageSwitcher fullWidth />
        </MobileLanguageSwitcherContainer>

        <MobileLogoutContainer>
          <MobileLogoutButton onClick={handleLogout}>
            {isLoading ? (
              <SpinnerWrapper>
                <Spinner type="ring" size={16} />
              </SpinnerWrapper>
            ) : (
              <>
                <IconWrapper>
                  <Image src="/images/exit-icon.svg" alt="Exit icon" width={16} height={16} />
                </IconWrapper>
                <MobileLogoutButtonText>
                  <Text variant="s" tag="span">
                    {t('COMMON.BUTTON_LOGOUT')}
                  </Text>
                </MobileLogoutButtonText>
              </>
            )}
          </MobileLogoutButton>
        </MobileLogoutContainer>
      </MobileMenuContainer>
    </>
  );
};

export default Navbar;
