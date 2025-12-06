import { Icon } from '@/components/Icon';
import { IIconProps } from '@/types';

export const ArrowCloseIcon = ({ className }: IIconProps) => {
  return (
    <Icon className={className}>
      <svg
        width="28"
        height="24"
        viewBox="0 0 28 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="28" height="24" rx="4" fill="#DBF7FF" fillOpacity="0.5" />
        <path
          d="M6 16L14 8L22 16"
          stroke="#FAFAFA"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Icon>
  );
};
