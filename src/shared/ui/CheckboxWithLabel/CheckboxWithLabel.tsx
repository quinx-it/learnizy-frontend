'use client';

import React, { FC } from 'react';
import { Checkbox } from '@/shared/ui/Checkbox';
import { Label } from '@/shared/ui/Label';
import { ICheckboxWithLabelProps } from './typings';

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
