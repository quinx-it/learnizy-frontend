import { Box, styled } from '@mui/material';

export const Form = styled('form')(() => ({
  width: '100%',
}));

export const FormGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '1.5rem 1rem',

  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '2rem 1rem',
  },
}));

export const FormField = styled(Box)(() => ({
  gridColumn: '1 / -1',
}));

export const ButtonsContainer = styled(Box)(({ theme }) => ({
  gridColumn: '1 / -1',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),

  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    gap: theme.spacing(0.5),
  },
}));

export const ButtonWrapper = styled(Box)(() => ({
  flex: 1,
  fontSize: '16px',

  '& > *': {
    width: '100%',
    fontSize: '16px',
  },
}));
