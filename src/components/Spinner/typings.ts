import { type LucideProps } from 'lucide-react';

export type SpinnerPropsType = LucideProps & {
  variant?: 'ring' | 'circle';
  className?: string;
};

export type SpinnerVariantPropsType = Omit<SpinnerPropsType, 'variant'>;
