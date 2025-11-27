import { Box, styled } from '@mui/material';

export const ModuleProgressCardContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const ButtonsWrapper = styled(Box)(() => ({
  marginTop: '0.5rem',
  display: 'flex',
  gap: '0.5rem',
}));

export const CreateButtonWrapper = styled(Box)(() => ({
  marginBottom: '1rem',
}));

export const FormContent = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
}));

export const ModulesGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '1rem',

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
}));
