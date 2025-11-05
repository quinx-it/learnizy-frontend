import { cn } from '@/lib/utils';
import { IIconProps } from '@/types';

export const SendIcon = ({ className }: IIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className, 'h-[20px] w-[20px] text-inherit')}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M3.09539 0.211716C1.51279 -0.560692 -0.221464 0.890459 0.0232207 2.78237L0.823175 8.9675C0.899201 9.55533 1.28987 10.0338 1.8114 10.1779L13.5 12L1.8114 13.8222C1.28987 13.9663 0.899201 14.4447 0.823175 15.0325L0.0232207 21.2176C-0.221464 23.1095 1.51279 24.5607 3.09539 23.7883L22.687 14.2265C24.4377 13.372 24.4377 10.628 22.687 9.77355L3.09539 0.211716Z"
        fill="#238BA7"
      />
    </svg>
  );
};
