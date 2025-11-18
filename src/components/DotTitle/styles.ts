import { Box, styled } from '@mui/material';

export const Container = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.375rem',
}));

export const SecondLabel = styled('span')(() => ({
  fontWeight: 500,
  display: 'inline',
}));

export const Dot = styled('span')(() => ({
  lineHeight: 'inherit',
  backgroundColor: 'transparent !important',
  paddingLeft: '0.25rem',
  paddingRight: '0.25rem',
  fontSize: '22px',
  '&.dot-small': {
    fontSize: '16px',
  },
}));
