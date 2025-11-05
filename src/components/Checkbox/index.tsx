'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { ComponentProps, FC } from 'react';

import { CheckIcon } from '@/components/Icons';
import { cn } from '@/lib/utils';

const Checkbox: FC<ComponentProps<typeof CheckboxPrimitive.Root>> = ({ className, ...props }) => {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        'peer border-medium size-4.5 cursor-pointer rounded-full border bg-transparent transition-colors',
        'hover:border-gray',
        'disabled:border-light disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center">
        <CheckIcon color="blue" className="size-2.25" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
};

export default Checkbox;
