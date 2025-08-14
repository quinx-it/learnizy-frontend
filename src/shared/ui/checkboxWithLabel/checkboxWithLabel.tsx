import React, { ReactNode } from 'react'
import { Checkbox } from '@shared/ui/checkbox'
import { Label } from '@shared/ui/label'
import { CheckboxProps } from '@radix-ui/react-checkbox'

interface CheckboxWithLabelProps extends CheckboxProps {
  children: ReactNode
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export const CheckboxWithLabel = ({ children, checked, onCheckedChange, ...props }: CheckboxWithLabelProps) => {
  return (
    <div className="flex shrink-0 items-center gap-3">
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="inline-block min-h-4.5 min-w-4.5"
        {...props}
      />
      <Label className="inline-block text-[12px]">{children}</Label>
    </div>
  )
}