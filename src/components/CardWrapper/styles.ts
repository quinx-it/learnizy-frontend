import { Box, styled } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  padding: 24,
  borderRadius: '1rem',
  backgroundColor: theme.palette.background.default,
  boxShadow: '0px 4px 13px 0px rgba(0, 0, 0, 0.15)',
}));
