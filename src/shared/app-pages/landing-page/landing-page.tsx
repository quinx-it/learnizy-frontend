import { routes } from '@/shared/constants';
import { Heading } from '@/shared/ui/typography';
import Link from 'next/link';
import Image from 'next/image';

export const LandingPage = () => {
  return (
    <>
      <Heading>Landing</Heading>
      <Link href={routes.user.homePage}>Learn</Link>
      <Link href={routes.mentor.students}>Mentor</Link>
      <Image src='/images/astronaut1.webp' width={100} height={100} alt='mama'/>
    </>
  );
};
