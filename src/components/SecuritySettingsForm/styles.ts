import { Box, styled } from '@mui/material';

export const Form = styled('form')(() => ({
  width: '100%',
}));

export const FormGrid = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridTemplateRows: 'repeat(3, 1fr) auto',
  gap: '2rem 1rem',
}));

export const FormField = styled(Box)(() => ({
  gridColumn: 'span 2',
}));

export const ButtonsContainer = styled(Box)(({ theme }) => ({
  gridColumn: 'span 2',
  display: 'flex',
  gap: theme.spacing(0.5),
}));

export const ButtonWrapper = styled(Box)(() => ({
  flex: 1,
  fontSize: '16px',

  '& > *': {
    width: '100%',
    fontSize: '16px',
  },
}));
