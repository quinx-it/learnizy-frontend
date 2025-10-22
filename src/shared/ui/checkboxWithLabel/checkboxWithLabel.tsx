import React, { ReactNode, FC } from 'react';
import { Checkbox } from '@/shared/ui/checkbox';
import { Label } from '@/shared/ui/label';
import { CheckboxProps } from '@radix-ui/react-checkbox';

interface ICheckboxWithLabelProps extends CheckboxProps {
  children: ReactNode;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

export const CheckboxWithLabel: FC<ICheckboxWithLabelProps> = (props) => {
  const { children, checked, onCheckedChange, ...restProps } = props;

  return (
    <div className="flex shrink-0 items-center gap-3">
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="inline-block min-h-4.5 min-w-4.5"
        {...restProps}
      />
      <Label className="inline-block text-[12px]">{children}</Label>
    </div>
  );
};
