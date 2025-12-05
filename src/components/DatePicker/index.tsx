'use client';

import { useState, useEffect, FC } from 'react';

import { Calendar } from '@/components/Calendar';
import { CalendarIcon } from '@/components/Icons';
import Popover from '@/components/Popover';
import { useTranslation } from '@/hooks';

import { IDatePickerProps } from './typings';
import { formatDate, parseDateString } from './utils';

import { Container, StyledDateInput, IconWrapper } from './styles';

const DatePicker: FC<IDatePickerProps> = ({ label, value, onChange, error }) => {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  const [inputValue, setInputValue] = useState(formatDate(value || undefined));
  const [month, setMonth] = useState<Date | undefined>(value || undefined);

  useEffect(() => {
    setInputValue(formatDate(value || undefined));
    setMonth(value || undefined);
  }, [value]);

  return (
    <Container>
      <StyledDateInput
        id="date"
        value={inputValue}
        label={label}
        placeholder={t('PERSONAL_DATA_FORM.DATE_PLACEHOLDER')}
        maxLength={10}
        error={error}
        onChange={(e) => {
          let val = e.target.value.replace(/[^\d.]/g, '');

          if (val.length > 2 && val[2] !== '.') val = `${val.slice(0, 2)}.${val.slice(2)}`;

          if (val.length > 5 && val[5] !== '.') val = `${val.slice(0, 5)}.${val.slice(5)}`;

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
        <IconWrapper id="date-picker">
          <CalendarIcon type="dark" />
        </IconWrapper>
      </Popover>
    </Container>
  );
};

export default DatePicker;
