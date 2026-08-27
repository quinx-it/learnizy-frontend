import { type CardType } from './const';

export type AdvantageCardType = {
  type: CardType;
  titleKey: string;
  textKey: string;
};

export type AdvantageCardPropsType = {
  title: string;
  text: string;
  type: CardType;
  className?: string;
};
