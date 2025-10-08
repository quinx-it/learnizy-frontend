import { IconProps } from '@/shared/types';

const colors = {
  white: '#FAFAFA',
  gray: '#B9B9B9',
  blue: '#238BA7',
  black: '#0C0C0C',
  info: '#5F4EE0',
} as const;

const sizeMap = {
  large: 16,
  medium: 12,
  small: 8,
} as const;

type CrossIconPropsType = {
  color?: keyof typeof colors;
  size?: keyof typeof sizeMap;
};

export const CrossIcon = ({
  className,
  color = 'white',
  size = 'large',
}: IconProps & CrossIconPropsType) => {
  const pixelSize = sizeMap[size];

  return (
    <svg
      className={className}
      width={pixelSize}
      height={pixelSize}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.6902 0.391407C14.2186 -0.130484 15.0749 -0.130455 15.6033 0.391407C16.1317 0.913341 16.1317 1.75912 15.6033 2.28106L9.81326 7.99981L15.6033 13.7186C16.1317 14.2405 16.1316 15.0863 15.6033 15.6082C15.0749 16.1301 14.2186 16.1301 13.6902 15.6082L7.90017 9.88848L2.30935 15.4119C1.78093 15.9337 0.924642 15.9338 0.396268 15.4119C-0.132022 14.89 -0.132008 14.0442 0.396268 13.5223L5.98709 7.99981L0.396268 2.47734C-0.13206 1.9554 -0.132119 1.1096 0.396268 0.587696C0.924652 0.0658495 1.78095 0.0658834 2.30935 0.587696L7.90017 6.11016L13.6902 0.391407Z"
        fill={colors[color]}
      />
    </svg>
  );
};
