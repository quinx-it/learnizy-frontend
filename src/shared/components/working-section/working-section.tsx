'use client';
import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Text } from '@/shared/ui/typography';
import Image from 'next/image';
import { constants } from './constants';

type WorkingSectionPropsType = {
  className?: string;
};

export const WorkingSection = ({ className }: WorkingSectionPropsType) => {
  return (
    <div className="flex h-full items-center">
      <div className={cn('m-auto flex flex-col items-center gap-6 text-center', className)}>
        <Image
          width={110}
          height={105}
          src="/images/astronaut1.webp"
          alt="astronaut"
          className="md:max-w-[110px]"
        />
        <Text className="whitespace-pre-wrap" variant={'l'}>
          {constants.text}
        </Text>
      </div>
    </div>
  );
};
