import { Icon } from '@/components/Icon';
import { IIconProps } from '@/types';

const colors = {
  white: '#FAFAFA',
  gray: '#B9B9B9',
  blue: '#238BA7',
  black: '#0C0C0C',
} as const;

type CheckIconPropsType = {
  color?: keyof typeof colors;
};

export const CheckIcon = ({ className, color = 'white' }: IIconProps & CheckIconPropsType) => {
  return (
    <Icon className={className}>
      <svg
        width="18"
        height="13"
        viewBox="0 0 18 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          width="2.2814"
          height="9.12561"
          rx="1.1407"
          transform="matrix(0.707107 -0.707106 0.707107 0.707106 0 6.5144)"
          fill={colors[color]}
        />
        <rect
          width="2.2814"
          height="16.1034"
          rx="1.1407"
          transform="matrix(0.707107 0.707106 -0.707107 0.707106 16.286 0)"
          fill={colors[color]}
        />
      </svg>
    </Icon>
  );
};
