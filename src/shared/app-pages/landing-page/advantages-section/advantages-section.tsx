import { Heading } from '@/shared/ui/typography';
import React from 'react';
import { AdvantageCard, CardType } from './advantage-card';
import { SectionContent } from '../section-content';

export const AdvantagesSection = () => {
  const items = [
    {
      title: 'Больше, чем Java',
      text: 'Мы не ограничиваемся только программированием. В Learnizy вы найдете курсы по маркетингу, логистике, бизнес-аналитике и другим востребованным направлениям',
      type: CardType.Dark,
    },
    {
      title: 'Больше, чем Java',
      text: 'Мы не ограничиваемся только программированием. В Learnizy вы найдете курсы по маркетингу, логистике, бизнес-аналитике и другим востребованным направлениям',
      type: CardType.Light,
    },
    {
      title: 'Больше, чем Java',
      text: 'Мы не ограничиваемся только программированием. В Learnizy вы найдете курсы по маркетингу, логистике, бизнес-аналитике и другим востребованным направлениям',
      type: CardType.Dark,
    },
    {
      title: 'Больше, чем Java',
      text: 'Мы не ограничиваемся только программированием. В Learnizy вы найдете курсы по маркетингу, логистике, бизнес-аналитике и другим востребованным направлениям',
      type: CardType.Light,
    },
  ];

  return (
    <SectionContent className="bg-[#B7E3F0]">
      <div className="max-w-[1140px] mx-auto px-4">
        <div className="w-full px-16">
          <Heading variant={'7xl'} className="mb-2">
            Почему выбирают нас?
          </Heading>
          <Heading className="mb-30 max-w-[750px]">
            От практики с реальными кейсами до поддержки менторов – всё, чтобы вы уверенно прошли
            техническое интервью.
          </Heading>
        </div>

        <div className="mx-auto grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
          {items.map((item, index) => (
            <AdvantageCard key={index} {...item} />
          ))}
        </div>
      </div>
    </SectionContent>
  );
};
