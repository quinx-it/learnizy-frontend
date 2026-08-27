'use client';

import { type FC } from 'react';

import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslation } from '@/hooks';

import { accountLinks, learnLinks } from './const';

import {
  BottomBar,
  BrandColumn,
  ColumnTitle,
  Columns,
  Copyright,
  FooterLink,
  FooterWrapper,
  LinkColumn,
  LinkList,
  StyledLogo,
  StyledSectionContent,
  SwitcherSlot,
  Tagline,
} from './styles';

const LandingFooter: FC = () => {
  const { t } = useTranslation();

  const year = new Date().getFullYear();

  return (
    <StyledSectionContent component="footer">
      <FooterWrapper>
        <Columns>
          <BrandColumn>
            <StyledLogo width={160} height={56} src="/images/logo.svg" alt="Learnizy" />
            <Tagline variant="m">{t('LANDING.FOOTER.TAGLINE')}</Tagline>
          </BrandColumn>

          <LinkColumn>
            <ColumnTitle tag="span" variant="s-bold">
              {t('LANDING.FOOTER.LEARN_TITLE')}
            </ColumnTitle>

            <LinkList>
              {learnLinks.map((link) => (
                <FooterLink key={link.route} href={link.route}>
                  {t(link.labelKey)}
                </FooterLink>
              ))}
            </LinkList>
          </LinkColumn>

          <LinkColumn>
            <ColumnTitle tag="span" variant="s-bold">
              {t('LANDING.FOOTER.ACCOUNT_TITLE')}
            </ColumnTitle>

            <LinkList>
              {accountLinks.map((link) => (
                <FooterLink key={link.route} href={link.route}>
                  {t(link.labelKey)}
                </FooterLink>
              ))}
            </LinkList>
          </LinkColumn>
        </Columns>

        <BottomBar>
          <Copyright variant="s">
            © {year} Learnizy. {t('LANDING.FOOTER.RIGHTS')}
          </Copyright>

          <SwitcherSlot>
            <LanguageSwitcher />
          </SwitcherSlot>
        </BottomBar>
      </FooterWrapper>
    </StyledSectionContent>
  );
};

export default LandingFooter;
