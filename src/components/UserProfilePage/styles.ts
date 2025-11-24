import { Box, styled } from '@mui/material';

export const Container = styled(Box)(() => ({
  display: 'grid',
  height: '100%',
  gridTemplateColumns: '1fr',
  gap: '1rem',

  '@media (min-width: 768px)': {
    gridTemplateColumns: '3fr 7fr',
  },
}));
