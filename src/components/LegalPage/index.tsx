'use client';

import { type FC } from 'react';

import { ROUTES } from '@/const';
import { useTranslation } from '@/hooks';

import { SECTION_NUMBERS } from './const';
import { type LegalPagePropsType } from './typings';

import {
  BackLink,
  Container,
  Draft,
  Intro,
  Page,
  Section,
  SectionText,
  SectionTitle,
  Title,
  Updated,
} from './styles';

const LegalPage: FC<LegalPagePropsType> = (props) => {
  const { document } = props;

  const { t } = useTranslation();

  const key = (suffix: string) => `LEGAL.${document}.${suffix}`;

  return (
    <Page>
      <Container>
        <BackLink href={ROUTES.LANDING_PAGE}>← {t('LEGAL.BACK')}</BackLink>

        <Title tag="h1" variant="7xl-bold">
          {t(key('TITLE'))}
        </Title>

        <Updated variant="s">{t('LEGAL.UPDATED')}</Updated>

        <Draft>
          <SectionText variant="m">{t('LEGAL.DRAFT_NOTICE')}</SectionText>
        </Draft>

        <Intro variant="l">{t(key('INTRO'))}</Intro>

        {SECTION_NUMBERS.map((number) => (
          <Section key={number}>
            <SectionTitle tag="h2" variant="xl-bold">
              {number}. {t(key(`S${number}_TITLE`))}
            </SectionTitle>
            <SectionText variant="m">{t(key(`S${number}_TEXT`))}</SectionText>
          </Section>
        ))}
      </Container>
    </Page>
  );
};

export default LegalPage;
