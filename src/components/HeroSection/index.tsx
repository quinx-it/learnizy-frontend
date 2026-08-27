'use client';

import { type FC } from 'react';

import LinkButton from '@/components/LinkButton';
import { ROUTES } from '@/const';
import { useTranslation } from '@/hooks';

import {
  Actions,
  Answer,
  AnswerText,
  BlockLabel,
  Description,
  Eyebrow,
  Intro,
  Layout,
  Note,
  Panel,
  PanelHeader,
  PanelLabel,
  PanelRole,
  Question,
  Review,
  ReviewBody,
  ReviewText,
  Score,
  ScoreLabel,
  ScoreValue,
  StyledHeroSection,
  Title,
} from './styles';

const HeroSection: FC = () => {
  const { t } = useTranslation();

  return (
    <StyledHeroSection>
      <Layout>
        <Intro>
          <Eyebrow variant="s-bold">{t('LANDING.HERO.EYEBROW')}</Eyebrow>

          <Title tag="h1" variant="7xl-bold">
            {t('LANDING.HERO.TITLE')}
          </Title>

          <Description variant="l">{t('LANDING.HERO.DESCRIPTION')}</Description>

          <Actions>
            <LinkButton href={ROUTES.REGISTER_PAGE} variant="yellow">
              {t('LANDING.HERO.PRIMARY_CTA')}
            </LinkButton>

            <LinkButton href={ROUTES.LOGIN_PAGE} variant="outlineLight">
              {t('LANDING.HERO.SECONDARY_CTA')}
            </LinkButton>
          </Actions>

          <Note variant="m">{t('LANDING.HERO.NOTE')}</Note>
        </Intro>

        <Panel>
          <PanelHeader>
            <PanelLabel variant="s-bold">{t('LANDING.HERO.PANEL_LABEL')}</PanelLabel>
            <PanelRole variant="s">{t('LANDING.HERO.PANEL_ROLE')}</PanelRole>
          </PanelHeader>

          <BlockLabel variant="s-bold">{t('LANDING.HERO.PANEL_PROGRESS')}</BlockLabel>
          <Question variant="l">{t('LANDING.HERO.PANEL_QUESTION')}</Question>

          <Answer>
            <BlockLabel variant="s-bold">{t('LANDING.HERO.PANEL_ANSWER_LABEL')}</BlockLabel>
            <AnswerText variant="m">{t('LANDING.HERO.PANEL_ANSWER')}</AnswerText>
          </Answer>

          <Review>
            <ReviewBody>
              <BlockLabel variant="s-bold">{t('LANDING.HERO.PANEL_REVIEW_LABEL')}</BlockLabel>
              <ReviewText variant="m">{t('LANDING.HERO.PANEL_REVIEW')}</ReviewText>
            </ReviewBody>

            <Score>
              <ScoreValue variant="2xl-bold">{t('LANDING.HERO.PANEL_SCORE')}</ScoreValue>
              <ScoreLabel variant="s">{t('LANDING.HERO.PANEL_SCORE_LABEL')}</ScoreLabel>
            </Score>
          </Review>
        </Panel>
      </Layout>
    </StyledHeroSection>
  );
};

export default HeroSection;
