'use client'

import * as SelectPrimitive from '@radix-ui/react-select'
import { ChevronDownIcon, ChevronUpIcon, CheckIcon } from 'lucide-react'

interface Option {
  label: string
  value: string
}

interface CustomSelectProps {
  value: string
  onValueChange: (value: string) => void
  options: Option[]
  placeholder?: string
  label?: string
}

export const CustomSelect = ({
  value,
  onValueChange,
  options,
  placeholder,
  label,
}: CustomSelectProps) => {
  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <SelectPrimitive.Trigger className="inline-flex gap-8 items-center justify-between rounded-4xl border px-6 py-2 text-[20px] leading-[27px] shadow-sm focus:outline-none focus:ring-2 focus:ring-ring">
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon>
          <ChevronDownIcon className="size-5" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className="z-50 m-0 mt-13 p-2 overflow-hidden rounded-3xl border bg-light shadow-md">
          <SelectPrimitive.ScrollUpButton className="flex justify-center py-1">
            <ChevronUpIcon className="size-4" />
          </SelectPrimitive.ScrollUpButton>

          <SelectPrimitive.Viewport className="p-1">
            {label && (
              <SelectPrimitive.Label className="px-2 py-1.5 text-xs text-black">
                {label}
              </SelectPrimitive.Label>
            )}
            <SelectPrimitive.Group>
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  className="relative flex cursor-default select-none items-center gap-2 rounded-3xl px-2 py-1.5 text-sm focus:bg-soft focus:text-black"
                >
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="absolute right-2">
                    <CheckIcon className="size-4" />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.Group>
          </SelectPrimitive.Viewport>

          <SelectPrimitive.ScrollDownButton className="flex justify-center py-1">
            <ChevronDownIcon className="size-4" />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  )
}