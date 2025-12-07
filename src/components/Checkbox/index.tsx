'use client';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import Image from 'next/image';
import { ComponentProps, FC } from 'react';

import { StyledIndicator, StyledRoot } from './styles';

const Checkbox: FC<ComponentProps<typeof CheckboxPrimitive.Root>> = ({ className, ...props }) => {
  return (
    <StyledRoot className={className} {...props}>
      <StyledIndicator>
        <Image
          src="/images/check-icon.svg"
          alt="Check icon"
          width={18}
          height={13}
          style={{ color: '#238BA7' }}
        />
      </StyledIndicator>
    </StyledRoot>
  );
};

export default Checkbox;
