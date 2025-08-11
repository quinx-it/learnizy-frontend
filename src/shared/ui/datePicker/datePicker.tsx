'use client';

import * as React from 'react';

import { Calendar } from '@ui/calendar';
import { Input } from '@ui/input';
import { Popover } from '@ui/popover';
import { CalendarIcon } from '@ui/icons';
import { formatDate, parseDateString } from './utils';

interface DatePickerProps {
  label: string;
}

export function DatePicker({ label }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date('2025-06-01'));
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [value, setValue] = React.useState(formatDate(date));

  return (
    <div className="relative">
      <Input
        id="date"
        value={value}
        label={label}
        placeholder="дд.мм.гггг"
        innerClassName="bg-background rounded-4xl px-4 py-2 pr-10"
        maxLength={10}
        onChange={(e) => {
          let val = e.target.value.replace(/[^\d.]/g, '');
          if (val.length > 2 && val[2] !== '.') val = val.slice(0, 2) + '.' + val.slice(2);
          if (val.length > 5 && val[5] !== '.') val = val.slice(0, 5) + '.' + val.slice(5);
          setValue(val);

          const parsed = parseDateString(val);
          if (parsed) {
            setDate(parsed);
            setMonth(parsed);
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
            selected={date}
            captionLayout="label"
            month={month}
            onMonthChange={setMonth}
            onSelect={(selected: Date | undefined) => {
              setDate(selected);
              setValue(formatDate(selected));
              setOpen(false);
            }}
          />
        }
      >
        <div id="date-picker" className="absolute bottom-2.5 right-3 cursor-pointer">
          <CalendarIcon type="dark" />
        </div>
      </Popover>
    </div>
  );
}
