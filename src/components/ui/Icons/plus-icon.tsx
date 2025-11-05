import { IIconProps } from '@/types';

const colors = {
  white: '#FAFAFA',
  gray: '#B9B9B9',
  blue: '#238BA7',
  black: '#0C0C0C',
} as const;

type PlusIconPropsType = {
  color?: keyof typeof colors;
};

export const PlusIcon = ({ className, color = 'white' }: IIconProps & PlusIconPropsType) => {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 0C9.69036 0 10.25 0.559644 10.25 1.25V7.75H16.75C17.4404 7.75 18 8.30964 18 9C18 9.69036 17.4404 10.25 16.75 10.25H10.25V16.75C10.25 17.4404 9.69036 18 9 18C8.30964 18 7.75 17.4404 7.75 16.75V10.25H1.25C0.559644 10.25 0 9.69036 0 9C0 8.30964 0.559644 7.75 1.25 7.75H7.75V1.25C7.75 0.559644 8.30964 0 9 0Z"
        fill={colors[color]}
      />
    </svg>
  );
};
