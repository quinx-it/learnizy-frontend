import { cn } from '@/shared/lib/utils';
import { Heading, Text } from '@/shared/ui/typography';
import Image from 'next/image';
import React from 'react';

type AdvantageCardProps = {
  title: string;
  text: string;
  type: CardType;
  className?: string;
};

export enum CardType {
  Dark = 'dark',
  Light = 'light',
}

const cardStyles = {
  [CardType.Dark]: {
    bg: 'bg-primary',
    heading: 'text-card',
    text: 'text-card',
  },
  [CardType.Light]: {
    bg: 'bg-card',
    heading: 'text-primary',
    text: 'text-primary',
  },
};

export const AdvantageCard = ({ type, title, text, className }: AdvantageCardProps) => {
  const styles = cardStyles[type];

  return (
    <div
      className={cn(
        'relative flex aspect-square max-w-[558px] flex-col justify-between overflow-hidden rounded-3xl p-16',
        styles.bg,
        className,
      )}
    >
      <div>
        <Heading variant={'5xl'} className={`mb-3 ${styles.heading}`}>
          {title}
        </Heading>
        <Text variant={'l'} className={`${styles.text}`}>
          {text}
        </Text>
      </div>
      <div className="mt-6 flex justify-center">
        <Image
          width={305}
          height={306}
          src="/images/rocketOnBlue.webp"
          alt="rocket"
          className="absolute -right-1/10 -bottom-1/10 scale-x-[-1] transform max-w-[305px] w-1/2 xl:w-full "
        />
      </div>
    </div>
  );
};
