'use client';

import { AdvantagesSection } from '@/components/AdvantagesSection';
import HeroSection from '@/components/HeroSection';

import { Main } from './styles';

export const LandingPage = () => {
  return (
    <Main>
      <HeroSection />
      <AdvantagesSection />
    </Main>
  );
};
