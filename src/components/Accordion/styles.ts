import { Box, styled, keyframes } from '@mui/material';
import {
  Accordion as RadixAccordion,
  AccordionContent as RadixAccordionContent,
  AccordionItem as RadixAccordionItem,
  AccordionTrigger as RadixAccordionTrigger,
} from '@radix-ui/react-accordion';

const accordionDown = keyframes`
  from {
    height: 0;
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    height: var(--radix-accordion-content-height);
    opacity: 1;
    transform: translateY(0);
  }
`;

const accordionUp = keyframes`
  from {
    height: var(--radix-accordion-content-height);
    opacity: 1;
    transform: translateY(0);
  }
  to {
    height: 0;
    opacity: 0;
    transform: translateY(-4px);
  }
`;

export const StyledAccordion = styled(RadixAccordion)(() => ({
  width: '100%',
}));

export const StyledAccordionItem = styled(RadixAccordionItem)(({ theme }) => ({
  marginBottom: theme.spacing(0.5),
  borderRadius: '16px',
  transition: 'background-color 0.2s ease-in-out',
  backgroundColor: theme.palette.info.main,
}));

export const StyledAccordionTrigger = styled(RadixAccordionTrigger)(() => ({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  paddingTop: '1rem',
  paddingBottom: '1rem',
  fontSize: '1.125rem',
  fontWeight: 600,
  transition: 'all 0.2s ease-in-out',
  outline: 'none',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
}));

export const IconWrapper = styled(Box)(() => ({
  position: 'relative',
  height: '1.25rem',
  width: '1.25rem',
}));

export const StyledPlusIcon = styled(Box)(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  height: '1.25rem',
  width: '1.25rem',
  transform: 'scale(1)',
  opacity: 1,
  transition: 'all 0.3s ease-in-out',
  color: theme.palette.primary.main,

  'button[data-state="open"] &': {
    transform: 'scale(0.75)',
    opacity: 0,
  },
}));

export const StyledMinusIcon = styled(Box)(({ theme }) => ({
  position: 'absolute',
  inset: 0,
  height: '1.25rem',
  width: '1.25rem',
  transform: 'scale(0.75)',
  opacity: 0,
  transition: 'all 0.3s ease-in-out',
  color: theme.palette.primary.main, // text-medium = #238ba7 (дефолтный цвет)

  'button[data-state="open"] &': {
    transform: 'scale(1)',
    opacity: 1,
  },
}));

export const StyledAccordionContent = styled(RadixAccordionContent)(({ theme }) => ({
  overflow: 'hidden',
  animationDuration: '300ms',
  animationTimingFunction: 'ease-out',
  willChange: 'height, opacity, transform',
  color: theme.palette.primary.main,

  '&[data-state="open"]': {
    animation: `${accordionDown} 300ms ease-out`,
  },

  '&[data-state="closed"]': {
    animation: `${accordionUp} 300ms ease-out`,
  },
}));

export const ContentWrapper = styled(Box)(({ theme }) => ({
  paddingLeft: theme.spacing(1),
  paddingTop: 0,
  paddingBottom: theme.spacing(1),
  fontSize: '0.875rem',
  lineHeight: 1.625,
}));
