import { Box, styled } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.primary,
}));
