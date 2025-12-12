'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDownIcon, ChevronUpIcon, CheckIcon } from 'lucide-react';
import { type FC } from 'react';

import { type ICustomSelectProps } from './typings';

import {
  StyledContent,
  StyledIcon,
  StyledItem,
  StyledItemIndicator,
  StyledItemText,
  StyledLabel,
  StyledScrollDownButton,
  StyledScrollUpButton,
  StyledTrigger,
  StyledValue,
  StyledViewport,
} from './styles';

const CustomSelect: FC<ICustomSelectProps> = (props) => {
  const { value, onValueChange, options, placeholder, label } = props;

  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <StyledTrigger>
        <StyledValue placeholder={placeholder} />
        <StyledIcon>
          <ChevronDownIcon width={20} height={20} />
        </StyledIcon>
      </StyledTrigger>

      <SelectPrimitive.Portal>
        <StyledContent>
          <StyledScrollUpButton>
            <ChevronUpIcon width={16} height={16} />
          </StyledScrollUpButton>

          <StyledViewport>
            <SelectPrimitive.Group>
              {label && <StyledLabel>{label}</StyledLabel>}
              {options.map((option) => (
                <StyledItem key={option.value} value={option.value}>
                  <StyledItemText>{option.label}</StyledItemText>
                  <StyledItemIndicator>
                    <CheckIcon width={16} height={16} />
                  </StyledItemIndicator>
                </StyledItem>
              ))}
            </SelectPrimitive.Group>
          </StyledViewport>

          <StyledScrollDownButton>
            <ChevronDownIcon width={16} height={16} />
          </StyledScrollDownButton>
        </StyledContent>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
};

export default CustomSelect;
