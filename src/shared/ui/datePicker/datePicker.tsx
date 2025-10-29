'use client';

import React, { useState, useEffect } from 'react';

import { Calendar } from '@/shared/ui/calendar';
import { Input } from '@/shared/ui/input';
import { Popover } from '@/shared/ui/popover';
import { CalendarIcon } from '@/shared/ui/icons';
import { formatDate, parseDateString } from './utils';
import { IDatePickerProps } from './typings';

export function DatePicker({ label, value, onChange, error }: IDatePickerProps) {
  const [open, setOpen] = useState(false);

  const [inputValue, setInputValue] = useState(formatDate(value || undefined));
  const [month, setMonth] = useState<Date | undefined>(value || undefined);

  useEffect(() => {
    setInputValue(formatDate(value || undefined));
    setMonth(value || undefined);
  }, [value]);

  return (
    <div className="relative">
      <Input
        id="date"
        value={inputValue}
        label={label}
        placeholder="дд.мм.гггг"
        innerClassName="bg-background rounded-4xl px-4 py-2 pr-10"
        maxLength={10}
        error={error}
        onChange={(e) => {
          let val = e.target.value.replace(/[^\d.]/g, '');
          if (val.length > 2 && val[2] !== '.') val = val.slice(0, 2) + '.' + val.slice(2);
          if (val.length > 5 && val[5] !== '.') val = val.slice(0, 5) + '.' + val.slice(5);
          setInputValue(val);

          const parsed = parseDateString(val);
          if (parsed) {
            setMonth(parsed);
            onChange(parsed);
          } else {
            onChange(null);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault();
            setOpen(true);
          }
        }}
      />
      <Popover
        open={open}
        onOpenChange={setOpen}
        side="bottom"
        align="end"
        offset={10}
        content={
          <Calendar
            mode="single"
            selected={value || undefined}
            captionLayout="label"
            month={month}
            onMonthChange={setMonth}
            onSelect={(selected: Date | undefined) => {
              onChange(selected ?? null);
              setOpen(false);
            }}
          />
        }
      >
        <div id="date-picker" className="absolute right-3 bottom-2 cursor-pointer">
          <CalendarIcon type="dark" />
        </div>
      </Popover>
    </div>
  );
}
