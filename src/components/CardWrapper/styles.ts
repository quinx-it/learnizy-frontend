import { Box, styled } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  padding: theme.spacing(2),

  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
  },
  borderRadius: '1rem',
  backgroundColor: theme.palette.background.default,
  boxShadow: '0px 4px 13px 0px rgba(0, 0, 0, 0.15)',
}));
