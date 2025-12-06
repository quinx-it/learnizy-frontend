import { Icon } from '@/components/Icon';
import { IIconProps } from '@/types';

const colors = {
  white: '#FAFAFA',
  gray: '#B9B9B9',
  blue: '#238BA7',
  black: '#0C0C0C',
} as const;

type MinusIconPropsType = {
  color?: keyof typeof colors;
};

export const MinusIcon = ({ className, color = 'white' }: IIconProps & MinusIconPropsType) => {
  return (
    <Icon className={className}>
      <svg width="18" height="4" viewBox="0 0 18 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect
          y="3.25"
          width="2.5"
          height="18"
          rx="1.25"
          transform="rotate(-90 0 3.25)"
          fill={colors[color]}
        />
      </svg>
    </Icon>
  );
};
