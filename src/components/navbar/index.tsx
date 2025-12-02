'use client';

import { useState, FC } from 'react';

import { HeaderLogo, ExitIcon, CubesMainIcon } from '@/components/Icons';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { INavbarProps } from '@/components/navbar/typings';
import Spinner from '@/components/Spinner';
import { Text } from '@/components/Typography';
import { routes } from '@/const';
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
          <CubesMainIcon />
        </StyledMobileMenuButton>
      </MobileMenuButtonWrapper>

      <NavbarContainer>
        <LogoLink href={routes.user.homePage}>
          <HeaderLogo />
        </LogoLink>

        <LinksContainer>
          {links.map(({ href, Icon, label }) => (
            <NavbarLink key={label} href={href} Icon={Icon} label={t(label)} />
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
                <ExitIcon />
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
            aria-label="Закрыть"
            onClick={() => setIsOpen(false)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setIsOpen(false);
            }}
          />
          <MobileMenuContainer isOpen={isOpen}>
            <MobileLogoLink href={routes.user.homePage} onClick={() => setIsOpen(false)}>
              <HeaderLogo />
            </MobileLogoLink>

            <MobileLinksContainer>
              {links.map(({ href, Icon, label }) => (
                <NavbarLink
                  key={label}
                  href={href}
                  Icon={Icon}
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
                      <ExitIcon />
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
