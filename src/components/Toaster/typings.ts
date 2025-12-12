import { type ReactNode } from 'react';

export type NotificationVariantType = 'info' | 'success' | 'warning' | 'error';

export type ColorMapEntryType = {
  bg: string;
  text: string;
  icon: ReactNode;
};

export type CustomToastPropsType = {
  variant: NotificationVariantType;
  title: string;
  description: string;
  onClose: () => void;
};
