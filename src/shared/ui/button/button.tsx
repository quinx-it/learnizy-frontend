import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/shared/lib/utils';

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive enabled:cursor-pointer",
  {
    variants: {
      variant: {
        default: 'bg-primary font-normal text-muted  hover:bg-accent active:bg-accent',
        secondary:
          'bg-background font-normal text-primary hover:bg-muted hover:text-accent active:bg-muted active:text-accent',
        third:
          'bg-muted font-normal text-primary hover:bg-background hover:text-accent active:bg-background active:text-accent',
        link: 'text-foreground underline-offset-4 hover:underline',
        'ghost-dark':
          'hover:bg-background hover:text-accent active:text-accent active:bg-background',
        'ghost-light':
          'text-background hover:bg-muted active:bg-muted hover:text-primary active:text-primary',

        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
      },
      size: {
        lg: 'h-[50px] px-[30px] py-3 rounded-[30px] text-[24px] leading-[26px] gap-[15px]',
        icon: 'size-11 rounded-full',
        text: 'text-[20px] leading-[22px] font-normal',
        xs: 'h-8 max-w-[244px] w-full text-[12px] leading-[16px] font-normal py-2 gap-[10px]',
        m: 'h-[38px] max-w-[157px] w-full text-[16px] leading-[18px] font-normal py-[10px] gap-[10px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'lg',
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
