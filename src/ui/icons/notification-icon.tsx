import { IIconProps } from '@/types';
import { ReactNode } from 'react';

type NotificationStatusType = 'error' | 'success' | 'info' | 'warning';

const ICON_SIZE = 18;
const VIEW_BOX = '0 0 20 18';

const BaseIcon = ({
  className,
  children,
}: IIconProps & { children: ReactNode; className: string }) => (
  <svg
    width={ICON_SIZE}
    height={ICON_SIZE}
    viewBox={VIEW_BOX}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    {children}
  </svg>
);

const StatusIcons = (color: string): Record<NotificationStatusType, ReactNode> => ({
  success: (
    <>
      <path
        d="M9 0.599609C13.6392 0.599609 17.4004 4.36081 17.4004 9C17.4004 13.6392 13.6392 17.4004 9 17.4004C4.36081 17.4004 0.599609 13.6392 0.599609 9C0.599609 4.36081 4.36081 0.599609 9 0.599609Z"
        stroke={color}
        strokeWidth="1.2"
      />
      <rect
        x="4"
        y="9.00342"
        width="1.40205"
        height="5.60819"
        rx="0.701024"
        transform="rotate(-45 4 9.00342)"
        fill={color}
      />
      <rect
        x="13.5309"
        y="5.47754"
        width="1.40205"
        height="9.22091"
        rx="0.701024"
        transform="rotate(45 13.5309 5.47754)"
        fill={color}
      />
    </>
  ),
  warning: (
    <>
      <rect x="9" y="4" width="2" height="7" rx="1" fill={color} />
      <rect x="9" y="13" width="2" height="2" rx="1" fill={color} />
      <path
        d="M8.58105 1.42383C9.21234 0.325444 10.7877 0.325445 11.4189 1.42383L19.1768 14.9238C19.8112 16.0281 19.0144 17.4004 17.7568 17.4004H2.24316C0.98559 17.4004 0.188786 16.0281 0.823242 14.9238L8.58105 1.42383Z"
        stroke={color}
        strokeWidth="1.2"
      />
    </>
  ),
  info: (
    <>
      <path
        d="M9 0.599609C13.6392 0.599609 17.4004 4.36081 17.4004 9C17.4004 13.6392 13.6392 17.4004 9 17.4004C4.36081 17.4004 0.599609 13.6392 0.599609 9C0.599609 4.36081 4.36081 0.599609 9 0.599609Z"
        stroke={color}
        strokeWidth="1.2"
      />
      <rect x="8" y="7" width="2" height="8" rx="1" fill={color} />
      <rect x="8" y="3" width="2" height="2" rx="1" fill={color} />
    </>
  ),
  error: (
    <>
      <path
        d="M9 0.599609C13.6392 0.599609 17.4004 4.36081 17.4004 9C17.4004 13.6392 13.6392 17.4004 9 17.4004C4.36081 17.4004 0.599609 13.6392 0.599609 9C0.599609 4.36081 4.36081 0.599609 9 0.599609Z"
        stroke={color}
        strokeWidth="1.2"
      />
      <rect
        x="14.0022"
        y="2.84204"
        width="2"
        height="15.7829"
        transform="rotate(45 14.0022 2.84204)"
        fill={color}
      />
    </>
  ),
});

export const NotificationIcon = ({
  className,
  status = 'success',
  color = '#0C0C0C',
}: IIconProps & { status?: NotificationStatusType }) => {
  return <BaseIcon className={className ?? ''}>{StatusIcons(color)[status]}</BaseIcon>;
};
