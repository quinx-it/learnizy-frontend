import { Box, styled } from '@mui/material';

import Button from '@/components/Button';

export const ButtonWrapper = styled(Button)(() => ({
  display: 'flex',
  maxWidth: 'fit-content',
  gap: '0.75rem',
}));

export const Container = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
}));

export const DeleteButton = styled('button')(() => ({
  maxWidth: 'fit-content',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
