import { type AdvantageCardType } from './typings';

export const enum CardType {
  Dark = 'Dark',
  Light = 'Light',
}

export const cards: AdvantageCardType[] = [
  {
    type: CardType.Dark,
    titleKey: 'ADVANTAGES.CARD_1_TITLE',
    textKey: 'ADVANTAGES.CARD_1_TEXT',
    image: '/images/rocketOnBlue.webp',
  },
  {
    type: CardType.Light,
    titleKey: 'ADVANTAGES.CARD_2_TITLE',
    textKey: 'ADVANTAGES.CARD_2_TEXT',
    image: '/images/planet-with-disc-blue.webp',
  },
  {
    type: CardType.Light,
    titleKey: 'ADVANTAGES.CARD_3_TITLE',
    textKey: 'ADVANTAGES.CARD_3_TEXT',
    image: '/images/blue-planet-with-moon.webp',
  },
  {
    type: CardType.Dark,
    titleKey: 'ADVANTAGES.CARD_4_TITLE',
    textKey: 'ADVANTAGES.CARD_4_TEXT',
    image: '/images/rocket.webp',
  },
];
