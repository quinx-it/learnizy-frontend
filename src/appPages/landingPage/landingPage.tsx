import Page from '@/components/Page';

import { AdvantagesSection } from './AdvantagesSection';
import { HeroSection } from './HeroSection';

export const LandingPage = () => {
  return (
    <Page noIndex>
      <main className="m-0 w-full p-0">
        <HeroSection />
        <AdvantagesSection />
      </main>
    </Page>
  );
};
