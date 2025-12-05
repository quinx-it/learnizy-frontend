import { Slot } from '@radix-ui/react-slot';
import { FC, MouseEvent } from 'react';

import { StyledButton } from './styles';

import type { ButtonProps, ButtonSize, ButtonVariant } from './typings';

const Button: FC<ButtonProps> = ({
  className,
  variant = 'blue',
  size = 'large',
  onClick,
  asChild = false,
  type = 'button',
  children,
  ...props
}) => {
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = `${diameter}px`;
    circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];

    if (ripple) ripple.remove();

    button.appendChild(circle);

    if (typeof onClick === 'function') onClick(e);
  };

  if (asChild) {
    return (
      <Slot onClick={handleClick} data-variant={variant} {...props}>
        {children}
      </Slot>
    );
  }

  return (
    <StyledButton
      type={type}
      onClick={handleClick}
      variant={variant}
      size={size}
      data-variant={variant}
      className={className}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export const buttonVariants = (props?: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}) => {
  return props?.className || '';
};

export type { ButtonProps, ButtonSize, ButtonVariant } from './typings';

export default Button;
