import { Plus, Minus } from 'lucide-react';
import { FC } from 'react';

import { Text } from '@/components/Typography';
import { cn } from '@/lib/utils';

import { IAccordionProps } from './typings';

import {
  StyledAccordion,
  StyledAccordionItem,
  StyledAccordionTrigger,
  StyledAccordionContent,
  IconWrapper,
  StyledPlusIcon,
  StyledMinusIcon,
  ContentWrapper,
} from './styles';

const CardAccordion: FC<IAccordionProps> = (props) => {
  const { items, className } = props;

  return (
    <StyledAccordion type="single" collapsible className={className}>
      {items.map(({ value, heading, content, bgColor, textColor, iconColor }) => (
        <StyledAccordionItem key={value} value={value} className={cn(bgColor)}>
          <StyledAccordionTrigger>
            <Text tag="span" variant="m">
              {heading}
            </Text>
            <IconWrapper>
              <StyledPlusIcon className={cn(iconColor)}>
                <Plus className="h-5 w-5" />
              </StyledPlusIcon>
              <StyledMinusIcon className={cn(iconColor)}>
                <Minus className="h-5 w-5" />
              </StyledMinusIcon>
            </IconWrapper>
          </StyledAccordionTrigger>
          <StyledAccordionContent className={cn(textColor)}>
            <ContentWrapper>{content}</ContentWrapper>
          </StyledAccordionContent>
        </StyledAccordionItem>
      ))}
    </StyledAccordion>
  );
};

export default CardAccordion;
