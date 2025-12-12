import { type CheckboxProps } from '@radix-ui/react-checkbox';
import { type PropsWithChildren } from 'react';

export interface ICheckboxWithLabelProps extends CheckboxProps, PropsWithChildren {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}
