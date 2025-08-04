import { IconProps } from '@/shared/types';

export const CalendarType = {
  light: '#FAFAFA',
  dark: '#0C0C0C',
} as const;

type CalendarIconProps = {
  type?: keyof typeof CalendarType;
};

export const CalendarIcon = ({ className, type = 'light' }: IconProps & CalendarIconProps) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" stroke={CalendarType[type]} />
      <rect x="8.80005" y="8.80005" width="5.2" height="5.2" rx="2" fill={CalendarType[type]} />
      <path
        d="M12 0C14.2091 0 16 1.79086 16 4V4.7998H0V4C0 1.79086 1.79086 0 4 0H12ZM4 1.59961C3.55817 1.59961 3.2002 1.95856 3.2002 2.40039C3.20041 2.84204 3.5583 3.2002 4 3.2002C4.4417 3.2002 4.79959 2.84204 4.7998 2.40039C4.7998 1.95856 4.44183 1.59961 4 1.59961ZM12 1.59961C11.5582 1.59961 11.2002 1.95856 11.2002 2.40039C11.2004 2.84204 11.5583 3.2002 12 3.2002C12.4417 3.2002 12.7996 2.84204 12.7998 2.40039C12.7998 1.95856 12.4418 1.59961 12 1.59961Z"
        fill={CalendarType[type]}
      />
    </svg>
  );
};
