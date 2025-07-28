import { cn } from '@/shared/lib/utils';
import { cva, VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import React from 'react';

type SpinnerProps = {
  className?: string;
  size?: number;
};

const spinnerVariants = cva('text-muted-foreground animate-spin opacity-100', {
  variants: {
    variant: {
      default: 'text-primary',
      secondary: 'text-background',
      third: 'text-muted',
      light: 'text-light',
      dark: 'text-destructive',
    },
  },
});

export const Spinner = ({
  className,
  size = 6,
  variant,
}: SpinnerProps & VariantProps<typeof spinnerVariants>) => {
  return <Loader2 className={cn(spinnerVariants({ variant, className }), `size-${size}`)} />;
};
