'use client';

import { type FC } from 'react';

import { useTranslation } from '@/hooks';

import { accountLinks, learnLinks } from './const';

import {
  BottomBar,
  BrandColumn,
  ColumnTitle,
  Copyright,
  FooterLink,
  FooterWrapper,
  LinkColumn,
  LinkList,
  Statement,
  StyledLogo,
  StyledSectionContent,
  Tagline,
  TopGrid,
} from './styles';

const LandingFooter: FC = () => {
  const { t } = useTranslation();

  const year = new Date().getFullYear();

  return (
    <StyledSectionContent component="footer">
      <FooterWrapper>
        <TopGrid>
          <BrandColumn>
            <StyledLogo width={128} height={45} src="/images/logo.svg" alt="Learnizy" />
            <Statement tag="p">{t('LANDING.FOOTER.STATEMENT')}</Statement>
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
        </TopGrid>

        <BottomBar>
          <Tagline variant="s">{t('LANDING.FOOTER.TAGLINE')}</Tagline>

          <Copyright variant="s">
            © {year} Learnizy. {t('LANDING.FOOTER.RIGHTS')}
          </Copyright>
        </BottomBar>
      </FooterWrapper>
    </StyledSectionContent>
  );
};

export default LandingFooter;
