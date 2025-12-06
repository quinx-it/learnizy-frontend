import { Icon } from '@/components/Icon';
import { IIconProps } from '@/types';

export const MicChatIcon = ({ className }: IIconProps) => {
  return (
    <Icon className={className}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="24"
        viewBox="0 0 18 24"
        fill="none"
      >
        <path
          d="M9 15.1579C11.1344 15.1579 12.8571 13.4652 12.8571 11.3685V3.78948C12.8571 1.69263 11.1344 0 9 0C6.86565 0 5.14286 1.69263 5.14286 3.78948V11.3685C5.14286 13.4652 6.86565 15.1579 9 15.1579Z"
          fill="#238BA7"
        />
        <path
          d="M15.8144 11.3685H18C18 15.6757 14.5029 19.2379 10.2856 19.8569V24H7.71435V19.8569C3.49715 19.2379 0 15.6757 0 11.3685H2.18571C2.18571 15.1579 5.45144 17.8105 9 17.8105C12.5486 17.8105 15.8144 15.1579 15.8144 11.3685Z"
          fill="#238BA7"
        />
      </svg>
    </Icon>
  );
};
