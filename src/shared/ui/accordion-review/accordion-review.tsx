import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion';
import { cn } from '@/shared/lib/utils';
import { ArrowRightIcon } from '@/shared/ui/icons';
import { Text } from '@/shared/ui/typography';

import '@/shared/ui/accordion/accordion.css';

export type AccordionItemType = {
  value: string;
  number: number;
  messageNumber: number;
  content: string;
};

type AccordionReviewProps = {
  items: AccordionItemType[];
};

export const AccordionReview = ({ items }: AccordionReviewProps) => {
  return (
    <Accordion type="single" collapsible className={cn('w-full')}>
      {items.map(({ value, number, messageNumber, content }) => (
        <AccordionItem key={value} value={value} className={'mb-2 rounded-xl transition-colors'}>
          <AccordionTrigger
            className={cn(
              'group flex w-full cursor-pointer items-center justify-between transition-all',
              'focus:outline-none',
            )}
          >
            <Text>
              Модуль {number} -{' '}
              <Text tag="span" className="text-medium">
                {messageNumber} новое
              </Text>
            </Text>
            <Text className="relative h-5 w-5">
              <ArrowRightIcon
                color="blue"
                className={cn(
                  'absolute inset-0 size-4 h-5 w-5 rotate-90 transform transition-all duration-300',
                  'scale-100 opacity-100 group-data-[state=open]:scale-75 group-data-[state=open]:opacity-0',
                )}
              />
              <ArrowRightIcon
                color="blue"
                className={cn(
                  'absolute inset-0 h-5 w-5 -rotate-90 transform transition-all duration-300',
                  'scale-75 opacity-0 group-data-[state=open]:scale-100 group-data-[state=open]:opacity-100',
                )}
              />
            </Text>
          </AccordionTrigger>
          <AccordionContent className={'accordion-content'}>
            <Text className="px-1 py-2">{content}</Text>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
