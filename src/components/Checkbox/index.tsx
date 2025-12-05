'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { ComponentProps, FC } from 'react';

import { CheckIcon } from '@/components/Icons';

import { StyledIndicator, StyledRoot } from './styles';

const Checkbox: FC<ComponentProps<typeof CheckboxPrimitive.Root>> = ({ className, ...props }) => {
  return (
    <StyledRoot className={className} {...props}>
      <StyledIndicator>
        <CheckIcon color="blue" />
      </StyledIndicator>
    </StyledRoot>
  );
};

export default Checkbox;
