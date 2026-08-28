import { type CardType } from './const';

export type AdvantageCardType = {
  type: CardType;
  titleKey: string;
  textKey: string;
  image: string;
};

export type AdvantageCardPropsType = {
  title: string;
  text: string;
  type: CardType;
  image: string;
  className?: string;
};
