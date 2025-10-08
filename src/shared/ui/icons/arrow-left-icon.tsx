import { IconProps } from '@/shared/types';

const colors = {
  white: '#FAFAFA',
  gray: '#B9B9B9',
  blue: '#238BA7',
  black: '#0C0C0C',
} as const;

type ArrowLeftIconPropsType = {
  color?: keyof typeof colors;
};

export const ArrowLeftIcon = ({
  className,
  color = 'white',
}: IconProps & ArrowLeftIconPropsType) => {
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
        d="M7.28571 0.288292C7.672 -0.0968659 8.29867 -0.096631 8.68512 0.288292C9.07154 0.673592 9.07154 1.2985 8.68512 1.6838L2.36383 7.98653L8.71051 14.3156C9.09691 14.7009 9.09692 15.3259 8.71051 15.7111C8.32412 16.0964 7.69751 16.0963 7.3111 15.7111L0.342346 8.76192C0.2535 8.67334 0.185259 8.57215 0.137268 8.46407C-0.0870801 8.08568 -0.0365127 7.59003 0.289611 7.26485L7.28571 0.288292Z"
        fill={colors[color]}
      />
    </svg>
  );
};
