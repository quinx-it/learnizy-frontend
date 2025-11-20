import { Box, styled } from '@mui/material';

export const Form = styled('form')(() => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  gap: '1.5rem',
}));

export const SuccessContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.5rem',
}));

export const SuccessText = styled(Box)(() => ({
  fontSize: '1.125rem',
  fontWeight: 600,
  color: '#15803d',
}));
