import { Box, styled } from '@mui/material';

import CardWrapperBase from '@/components/CardWrapper';
import { Logo as LogoBase } from '@/components/Icons';

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default,
}));

export const CardWrapper = styled(CardWrapperBase)(({ theme }) => ({
  maxWidth: 472,
  padding: `${theme.spacing(8)} ${theme.spacing(4)}`,
}));

export const Logo = styled(LogoBase)({
  width: '100%',
  marginBottom: '3rem',
});
