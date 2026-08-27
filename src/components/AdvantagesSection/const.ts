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
  },
  {
    type: CardType.Light,
    titleKey: 'ADVANTAGES.CARD_2_TITLE',
    textKey: 'ADVANTAGES.CARD_2_TEXT',
  },
  {
    type: CardType.Light,
    titleKey: 'ADVANTAGES.CARD_3_TITLE',
    textKey: 'ADVANTAGES.CARD_3_TEXT',
  },
  {
    type: CardType.Dark,
    titleKey: 'ADVANTAGES.CARD_4_TITLE',
    textKey: 'ADVANTAGES.CARD_4_TEXT',
  },
];
