import Image from 'next/image';
import { type FC, type ComponentProps } from 'react';

import Label from '@/components/Label';

import {
  StyledCircleIconWrapper,
  StyledRadioGroupIndicator,
  StyledRadioGroupItem,
  StyledRadioGroupRoot,
} from './styles';

import type * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

const RadioGroup: FC<ComponentProps<typeof RadioGroupPrimitive.Root>> = ({
  className,
  ...props
}) => {
  return <StyledRadioGroupRoot data-slot="radio-group" className={className} {...props} />;
};

const RadioGroupItem: FC<ComponentProps<typeof RadioGroupPrimitive.Item>> = ({
  className,
  children,
  value,
  ...props
}) => {
  return (
    <Label className={className} htmlFor={value}>
      {children}
      <StyledRadioGroupItem data-slot="radio-group-item" value={value} id={value} {...props}>
        <StyledRadioGroupIndicator data-slot="radio-group-indicator">
          <StyledCircleIconWrapper>
            <Image src="/images/circle-icon.svg" alt="Circle icon" width={8} height={8} />
          </StyledCircleIconWrapper>
        </StyledRadioGroupIndicator>
      </StyledRadioGroupItem>
    </Label>
  );
};

export { RadioGroup, RadioGroupItem };
