import { IconProps } from '@/shared/types';

const colors = {
  white: '#FAFAFA',
  gray: '#B9B9B9',
  blue: '#238BA7',
} as const;

type MeatballIconPropsType = {
  color?: keyof typeof colors;
};

export const MeatballIcon = ({ className, color = 'white' }: IconProps & MeatballIconPropsType) => {
  return (
    <svg
      className={className}
      width="23"
      height="5"
      viewBox="0 0 23 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="2.5" cy="2.5" r="2.5" fill={colors[color]} />
      <circle cx="11.5" cy="2.5" r="2.5" fill={colors[color]} />
      <circle cx="20.5" cy="2.5" r="2.5" fill={colors[color]} />
    </svg>
  );
};
