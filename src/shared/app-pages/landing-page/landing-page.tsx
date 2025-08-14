import { Heading } from '@/shared/ui/typography';
import Image from 'next/image';
import { HeroSection } from './hero-section';

export const LandingPage = () => {
  return (
    <main className="m-0 w-full p-0">
      <HeroSection />
      <Heading>Landing</Heading>
      <Image src="/images/astronaut1.webp" width={100} height={100} alt="mama" />
    </main>
  );
};
