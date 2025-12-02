import { Box, Button as MuiButton, styled } from '@mui/material';

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

export const DeleteButton = styled(MuiButton)(() => ({
  maxWidth: 'fit-content',
  minWidth: 'auto',
  backgroundColor: 'transparent',
  border: 'none',
  padding: 0,
  textTransform: 'none',
  boxShadow: 'none',

  '&:hover': {
    boxShadow: 'none',
  },
}));
