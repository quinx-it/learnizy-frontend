import { type LucideProps } from 'lucide-react';

export type SpinnerVariantPropsType = Omit<SpinnerPropsType, 'variant'>;

export type SpinnerPropsType = LucideProps & {
  variant?: 'ring' | 'circle';
  className?: string;
};
