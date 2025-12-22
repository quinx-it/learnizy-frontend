import { Box, styled } from '@mui/material';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

export const StyledRoot = styled(CheckboxPrimitive.Root)(({ theme }) => ({
  width: '18px',
  height: '18px',
  cursor: 'pointer',
  borderRadius: '50%',
  border: '1px solid #238ba7',
  backgroundColor: 'transparent',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'border-color 0.2s ease-in-out',
  outline: 'none',

  '&:hover:not(:disabled)': {
    borderColor: theme.palette.grey[400],
  },

  '&:disabled': {
    borderColor: theme.palette.background.default,
    cursor: 'not-allowed',
    opacity: 0.5,
  },
}));

export const StyledIndicator = styled(CheckboxPrimitive.Indicator)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',

  '& svg': {
    width: '9px',
    height: 'auto',
  },
}));

export const Row = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
}));
