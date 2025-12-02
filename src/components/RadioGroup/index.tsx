import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { FC, ComponentProps } from 'react';

import { CircleIcon } from '@/components/Icons';
import Label from '@/components/Label';

import {
  StyledCircleIconWrapper,
  StyledRadioGroupIndicator,
  StyledRadioGroupItem,
  StyledRadioGroupRoot,
} from './styles';

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
            <CircleIcon />
          </StyledCircleIconWrapper>
        </StyledRadioGroupIndicator>
      </StyledRadioGroupItem>
    </Label>
  );
};

export { RadioGroup, RadioGroupItem };
