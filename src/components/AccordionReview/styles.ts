import { Box, styled } from '@mui/material';
import {
  Accordion as RadixAccordion,
  AccordionContent as RadixAccordionContent,
  AccordionItem as RadixAccordionItem,
  AccordionTrigger as RadixAccordionTrigger,
} from '@radix-ui/react-accordion';

export const StyledAccordion = styled(RadixAccordion)(() => ({
  width: '100%',
}));

export const StyledAccordionItem = styled(RadixAccordionItem)(({ theme }) => ({
  marginBottom: '0.5rem',
  borderRadius: theme.shape.borderRadius,
  transition: 'background-color 0.2s ease-in-out',
}));

export const IconWrapper = styled(Box)(() => ({
  position: 'relative',
  height: '1.25rem',
  width: '1.25rem',
}));

export const IconOpen = styled(Box)(() => ({
  position: 'absolute',
  inset: 0,
  height: '1.25rem',
  width: '1.25rem',
  transform: 'rotate(90deg)',
  transition: 'all 0.3s ease-in-out',
  transformOrigin: 'center',
  scale: 1,
  opacity: 1,

  'button[data-state="open"] &': {
    scale: 0.75,
    opacity: 0,
  },
}));

export const IconClose = styled(Box)(() => ({
  position: 'absolute',
  inset: 0,
  height: '1.25rem',
  width: '1.25rem',
  transform: 'rotate(-90deg)',
  transition: 'all 0.3s ease-in-out',
  transformOrigin: 'center',
  scale: 0.75,
  opacity: 0,

  'button[data-state="open"] &': {
    scale: 1,
    opacity: 1,
  },
}));

export const StyledAccordionTrigger = styled(RadixAccordionTrigger)(() => ({
  display: 'flex',
  width: '100%',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'all 0.2s ease-in-out',
  outline: 'none',
  border: 'none',
  background: 'transparent',
  padding: 0,
}));

export const StyledAccordionContent = styled(RadixAccordionContent)(() => ({
  paddingLeft: '0.25rem',
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
}));
