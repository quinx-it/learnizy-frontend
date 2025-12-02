import { Box, styled } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  height: '100vh',
  width: '100vw',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.primary.main,
  zIndex: 9999,

  '& svg': {
    color: `${theme.palette.primary.main} !important`,
  },

  '& svg circle': {
    stroke: `${theme.palette.primary.main} !important`,
  },

  '& svg g circle': {
    stroke: `${theme.palette.primary.main} !important`,
  },
}));
