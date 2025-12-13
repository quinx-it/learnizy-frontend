'use client';

import Image from 'next/image';
import { useState, type FC } from 'react';

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
  LogoutButton,
  LogoutButtonText,
  MobileLanguageSwitcherContainer,
  MobileLinksContainer,
  MobileLogoLink,
  MobileLogoutButton,
  MobileLogoutButtonText,
  MobileLogoutContainer,
  MobileMenuButtonWrapper,
  MobileMenuContainer,
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

  return (
    <>
      <MobileMenuButtonWrapper>
        <StyledMobileMenuButton onClick={() => setIsOpen(!isOpen)}>
          <Image src="/images/cubes-main-icon.svg" alt="Menu icon" width={16} height={16} />
        </StyledMobileMenuButton>
      </MobileMenuButtonWrapper>

      <NavbarContainer>
        <LogoLink href={ROUTES.user.homePage}>
          <Image
            src="/images/header-logo-mobile.svg"
            alt="Logo"
            width={44}
            height={44}
            className="hidden md:block lg:hidden"
          />
          <Image
            src="/images/header-logo-desktop.svg"
            alt="Logo"
            width={170}
            height={70}
            className="md:hidden lg:block"
          />
        </LogoLink>

        <LinksContainer>
          {links.map(({ href, src, label }) => (
            <NavbarLink key={label} href={href} src={src || ''} label={t(label)} />
          ))}
        </LinksContainer>

        <LanguageSwitcherContainer>
          <LanguageSwitcher />
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

      {isOpen && (
        <>
          <Overlay
            role="button"
            tabIndex={0}
            aria-label={t('COMMON_LABELS.CLOSE')}
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setIsOpen(false);
            }}
          />
          <MobileMenuContainer isOpen={isOpen}>
            <MobileLogoLink href={ROUTES.user.homePage} onClick={() => setIsOpen(false)}>
              <Image
                src="/images/header-logo-mobile.svg"
                alt="Logo"
                width={44}
                height={44}
                className="hidden md:block lg:hidden"
              />
              <Image
                src="/images/header-logo-desktop.svg"
                alt="Logo"
                width={200}
                height={70}
                className="md:hidden lg:block"
              />
            </MobileLogoLink>

            <MobileLinksContainer>
              {links.map(({ href, src, label }) => (
                <NavbarLink
                  key={label}
                  href={href}
                  src={src || ''}
                  label={label}
                  onClick={() => setIsOpen(false)}
                />
              ))}
            </MobileLinksContainer>

            <MobileLanguageSwitcherContainer>
              <LanguageSwitcher />
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
      )}
    </>
  );
};

export default Navbar;
