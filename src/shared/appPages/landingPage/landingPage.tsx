import { AdvantagesSection } from './AdvantagesSection';
import { HeroSection } from './HeroSection';
import Page from '@/shared/components/Page';

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
