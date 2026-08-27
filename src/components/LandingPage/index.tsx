'use client';

import { AdvantagesSection } from '@/components/AdvantagesSection';
import AiAssistantSection from '@/components/AiAssistantSection';
import CtaSection from '@/components/CtaSection';
import ExploreSection from '@/components/ExploreSection';
import HeroSection from '@/components/HeroSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import LandingFooter from '@/components/LandingFooter';
import LandingHeader from '@/components/LandingHeader';

import { Main, TopBand } from './styles';

export const LandingPage = () => {
  return (
    <Main component="main">
      <TopBand>
        <LandingHeader />
        <HeroSection />
      </TopBand>
      <AdvantagesSection />
      <HowItWorksSection />
      <AiAssistantSection />
      <ExploreSection />
      <CtaSection />
      <LandingFooter />
    </Main>
  );
};
