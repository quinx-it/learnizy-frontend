import { cn } from '@shared/lib/utils';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@radix-ui/react-accordion';
import { Plus, Minus } from 'lucide-react';

import './accordion.css';
import { Text } from '@/shared/ui/typography';

interface AccordionEntry {
  value: string;
  heading: string;
  content: string;
  bgColor?: string;
  textColor?: string;
  iconColor?: string;
}

interface AccordionProps {
  items: AccordionEntry[];
  className?: string;
}

export const CardAccordion = ({ items, className }: AccordionProps) => {
  return (
    <Accordion type="single" collapsible className={cn('w-full', className)}>
      {items.map(({ value, heading, content, bgColor, textColor, iconColor }) => (
        <AccordionItem
          key={value}
          value={value}
          className={cn('mb-2 rounded-xl transition-colors', bgColor || 'bg-soft')}
        >
          <AccordionTrigger
            className={cn(
              'group flex w-full items-center justify-between px-4 py-4 text-lg font-semibold transition-all',
              'focus:outline-none',
            )}
          >
            <Text tag="span" variant={'m'}>
              {heading}
            </Text>
            <Text tag="span" variant={'m'} className="relative h-5 w-5">
              <Plus
                className={cn(
                  'absolute inset-0 h-5 w-5 transform transition-all duration-300',
                  'scale-100 opacity-100 group-data-[state=open]:scale-75 group-data-[state=open]:opacity-0',
                  iconColor || 'text-medium',
                )}
              />
              <Minus
                className={cn(
                  'absolute inset-0 h-5 w-5 transform transition-all duration-300',
                  'scale-75 opacity-0 group-data-[state=open]:scale-100 group-data-[state=open]:opacity-100',
                  iconColor || 'text-medium',
                )}
              />
            </Text>
          </AccordionTrigger>
          <AccordionContent className={cn('accordion-content', textColor || 'text-medium')}>
            <div className="px-4 pt-0 pb-4 text-sm leading-relaxed">{content}</div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};