import { Box, styled } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  display: 'grid',
  height: '100%',
  gridTemplateColumns: '1fr',
  gap: '1rem',

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: '3fr 7fr',
  },
}));
