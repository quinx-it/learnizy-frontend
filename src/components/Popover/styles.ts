import { styled, keyframes } from '@mui/material';
import * as PopoverPrimitive from '@radix-ui/react-popover';

const popoverOpen = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-4px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const popoverClose = keyframes`
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.95) translateY(-4px);
  }
`;

export const StyledPopoverContent = styled(PopoverPrimitive.Content)(({ theme }) => ({
  zIndex: 50,
  width: '18rem',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(1),
  boxShadow: theme.shadows[3],
  outline: 'none',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  transformOrigin: 'var(--radix-popover-content-transform-origin)',

  '&[data-state="open"]': {
    animation: `${popoverOpen} 150ms ease-out`,
  },

  '&[data-state="closed"]': {
    animation: `${popoverClose} 150ms ease-in`,
  },
}));
