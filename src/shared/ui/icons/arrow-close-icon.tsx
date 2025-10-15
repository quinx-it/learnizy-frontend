import { IconProps } from '@/shared/types';
import { cn } from '@/shared/lib/utils';

export const ArrowCloseIcon = ({ className }: IconProps) => {
  return (
    <svg
      className={cn(className, 'h-[24px] w-[28px] text-inherit')}
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
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};
