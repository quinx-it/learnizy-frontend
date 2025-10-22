import { IIconProps } from '@/shared/types';

type PlayPauseIconPropsType = {
  color?: string;
  isPlaying?: boolean;
};

export const PlayPauseIcon = ({
  className,
  color = 'currentColor',
  isPlaying = false,
}: IIconProps & PlayPauseIconPropsType) => {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {isPlaying ? (
        <>
          <rect x="6" y="4" width="4" height="16" fill={color} />
          <rect x="14" y="4" width="4" height="16" fill={color} />
        </>
      ) : (
        <path
          d="M8 5v14l11-7-11-7z"
          fill={color}
          stroke={color}
          strokeWidth="3"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
};
