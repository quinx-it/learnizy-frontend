import { Box, styled } from '@mui/material';

import CardWrapperBase from '@/components/CardWrapper';

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '100dvh',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
}));

export const CardWrapper = styled(CardWrapperBase)(({ theme }) => ({
  maxWidth: 472,
  padding: `${theme.spacing(8)} ${theme.spacing(4)}`,
}));

export const LogoWrapper = styled(Box)({
  width: '100%',
  marginBottom: '3rem',
  display: 'flex',
  justifyContent: 'center',
});
