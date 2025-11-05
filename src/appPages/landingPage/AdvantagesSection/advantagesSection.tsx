import React from 'react';

import { Heading } from '@/components/Typography';

import { SectionContent } from '../SectionContent';

import { AdvantageCard } from './advantageCard';
import { constants } from './constants';

export const AdvantagesSection = () => {
  return (
    <SectionContent className="bg-[#B7E3F0]">
      <div className="mx-auto max-w-[1140px] px-4">
        <div className="w-full px-16">
          <Heading variant="7xl" className="mb-2">
            {constants.title}
          </Heading>
          <Heading className="mb-30 max-w-[750px]">{constants.description}</Heading>
        </div>

        <div className="mx-auto grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
          {constants.cards.map((item, index) => (
            <AdvantageCard key={index} {...item} />
          ))}
        </div>
      </div>
    </SectionContent>
  );
};
