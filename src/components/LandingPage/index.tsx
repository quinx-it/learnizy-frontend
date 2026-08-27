'use client';

import { AdvantagesSection } from '@/components/AdvantagesSection';
import AiAssistantSection from '@/components/AiAssistantSection';
import CtaSection from '@/components/CtaSection';
import ExploreSection from '@/components/ExploreSection';
import HeroSection from '@/components/HeroSection';
import HowItWorksSection from '@/components/HowItWorksSection';
import LandingFooter from '@/components/LandingFooter';

import { Main } from './styles';

export const LandingPage = () => {
  return (
    <Main component="main">
      <HeroSection />
      <AdvantagesSection />
      <HowItWorksSection />
      <AiAssistantSection />
      <ExploreSection />
      <CtaSection />
      <LandingFooter />
    </Main>
  );
};
