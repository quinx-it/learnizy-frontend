import { Box, styled } from '@mui/material';

import CardWrapper from '@/components/CardWrapper';

export const Form = styled('form')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
}));

export const FieldWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const ErrorText = styled(Box)(({ theme }) => ({
  color: theme.palette.error.main,
}));

export const SubmitButtonWrapper = styled(Box)(() => ({
  width: 'fit-content',
}));

export const LoadingContainer = styled(Box)(({ theme }) => ({
  marginTop: '1rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  color: theme.palette.grey[600],
}));

export const ResponseContainer = styled(Box)(({ theme }) => ({
  marginTop: '1rem',
  backgroundColor: theme.palette.grey[100],
  padding: '1rem',
}));

export const ErrorContainer = styled(CardWrapper)(({ theme }) => ({
  marginTop: '1rem',
  backgroundColor: 'rgba(230, 68, 68, 0.2)',
  padding: '1rem',

  '& > *': {
    color: theme.palette.error.main,
  },
}));
