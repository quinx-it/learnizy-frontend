'use client';

import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { ComponentProps, useEffect, useRef } from 'react';
import { DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker';

import Button, { buttonVariants } from '@/components/Button';
import { cn } from '@/lib/utils';

import {
  StyledChevron,
  StyledDayPicker,
  StyledRoot,
  StyledWeekNumberWrapper,
  StyledCalendarDayButton,
} from './styles';

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: ComponentProps<typeof DayButton>) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  const isSelectedSingle =
    modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle;

  return (
    <StyledCalendarDayButton
      ref={ref}
      variant="white"
      size="small"
      data-day={day.date.toLocaleDateString()}
      data-selected-single={isSelectedSingle || undefined}
      data-range-start={modifiers.range_start || undefined}
      data-range-end={modifiers.range_end || undefined}
      data-range-middle={modifiers.range_middle || undefined}
      className={className}
      {...props}
    />
  );
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'blue',
  formatters,
  components,
  ...props
}: ComponentProps<typeof DayPicker> & {
  buttonVariant?: ComponentProps<typeof Button>['variant'];
}) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <StyledDayPicker className={className}>
      <DayPicker
        showOutsideDays={showOutsideDays}
        captionLayout={captionLayout}
        formatters={{
          formatMonthDropdown: (date) => date.toLocaleString('default', { month: 'short' }),
          ...formatters,
        }}
        classNames={{
          root: defaultClassNames.root,
          months: defaultClassNames.months,
          month: defaultClassNames.month,
          nav: defaultClassNames.nav,
          button_previous: cn(
            buttonVariants({ variant: buttonVariant }),
            defaultClassNames.button_previous,
          ),
          button_next: cn(
            buttonVariants({ variant: buttonVariant }),
            defaultClassNames.button_next,
          ),
          month_caption: defaultClassNames.month_caption,
          dropdowns: defaultClassNames.dropdowns,
          dropdown_root: defaultClassNames.dropdown_root,
          dropdown: defaultClassNames.dropdown,
          caption_label: defaultClassNames.caption_label,
          weekdays: defaultClassNames.weekdays,
          weekday: defaultClassNames.weekday,
          week: defaultClassNames.week,
          week_number_header: defaultClassNames.week_number_header,
          week_number: defaultClassNames.week_number,
          day: defaultClassNames.day,
          range_start: defaultClassNames.range_start,
          range_middle: defaultClassNames.range_middle,
          range_end: defaultClassNames.range_end,
          today: defaultClassNames.today,
          outside: defaultClassNames.outside,
          disabled: defaultClassNames.disabled,
          hidden: defaultClassNames.hidden,
          ...classNames,
        }}
        components={{
          // eslint-disable-next-line react/prop-types
          Root: ({ className, rootRef, ...props }) => {
            return (
              <StyledRoot data-slot="calendar" ref={rootRef} className={className} {...props} />
            );
          },
          // eslint-disable-next-line react/prop-types
          Chevron: ({ className, orientation, ...props }) => {
            if (orientation === 'left') {
              return <StyledChevron as={ChevronLeftIcon} className={className} {...props} />;
            }

            if (orientation === 'right') {
              return <StyledChevron as={ChevronRightIcon} className={className} {...props} />;
            }

            return <StyledChevron as={ChevronDownIcon} className={className} {...props} />;
          },
          DayButton: CalendarDayButton,
          WeekNumber: ({ children, ...props }) => {
            return (
              <td {...props}>
                <StyledWeekNumberWrapper>{children}</StyledWeekNumberWrapper>
              </td>
            );
          },
          ...components,
        }}
        {...props}
      />
    </StyledDayPicker>
  );
}

export { Calendar, CalendarDayButton };
