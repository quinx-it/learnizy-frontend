import { IconProps } from '@/shared/types';

const colors = {
  white: '#FAFAFA',
  gray: '#B9B9B9',
  blue: '#238BA7',
  black: '#0C0C0C',
} as const;

type ArrowRightIconPropsType = {
  color?: keyof typeof colors;
};

export const ArrowRightIcon = ({
  className,
  color = 'white',
}: IconProps & ArrowRightIconPropsType) => {
  return (
    <svg
      className={className}
      width="9"
      height="16"
      viewBox="0 0 9 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.69285 15.7115C1.3113 16.0966 0.692666 16.0964 0.311016 15.7115C-0.0706367 15.3262 -0.0706367 14.7013 0.311016 14.316L6.55516 8.01324L0.285625 1.68414C-0.0958099 1.29884 -0.0959215 0.673866 0.285625 0.288632C0.667279 -0.0966663 1.28678 -0.0966663 1.66844 0.288632L8.55125 7.23785C8.63967 7.32715 8.70695 7.42959 8.75438 7.53863C8.97424 7.9167 8.92439 8.41047 8.60301 8.73492L1.69285 15.7115Z"
        fill={colors[color]}
      />
    </svg>
  );
};
