import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

import './button.css';
import { ComponentProps, MouseEvent } from 'react';

const baseStyles = [
  'relative overflow-hidden flex items-center justify-center box-content',
  'text-light rounded-[50px] focus:outline-none focus:ring-0 pointer disabled:cursor-not-allowed',
  'transition-colors duration-200 ease-in-out',
].join(' ');

const buttonVariants = cva(baseStyles, {
  variants: {
    variant: {
      blue: 'bg-medium hover:bg-dark disabled:bg-soft',
      yellow: 'bg-yellow-pale text-black hover:bg-yellow',
      white:
        'bg-light border border-medium text-black hover:bg-medium hover:text-light active:border-medium md:active:text-light disabled:border-gray disabled:text-gray',
      red: 'bg-medium hover:bg-dark text-white',
      green: 'bg-medium hover:bg-dark text-white',
      gray: 'bg-soft hover:bg-medium text-white',
    },
    size: {
      large: 'px-8 py-3 text-[20px] leading-[27px]',
      medium: 'px-6 py-2 text-[16px] leading-[22px]',
      small: 'px-5 py-1.5 text-[12px] leading-[16px]',
      icon: 'w-9 h-9 p-0',
    },
  },
  defaultVariants: {
    variant: 'blue',
    size: 'large',
  },
});

function Button({
  className,
  variant,
  size,
  onClick,
  asChild = false,
  type = 'button',
  children,
  ...props
}: ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : 'button';

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];

    if (ripple) ripple.remove();

    button.appendChild(circle);

    if (typeof onClick === 'function') onClick(e);
  };

  return (
    <Comp
      type={type}
      onClick={handleClick}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </Comp>
  );
}

export { Button, buttonVariants };
