import { styled } from '@mui/material';

import Button from '@/components/Button';

export const Form = styled('form')(() => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  gap: '1.5rem',
}));

export const RoundedButton = styled(Button)(() => ({
  borderRadius: '59px',
}));
