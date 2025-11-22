import { Box, styled } from '@mui/material';

import CardWrapperBase from '@/components/CardWrapper';
import { Logo as LogoBase } from '@/components/Icons';

export const Container = styled(Box)({
  display: 'flex',
  width: '100%',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
});

export const CardWrapper = styled(CardWrapperBase)({
  maxWidth: 472,
  padding: '64px 32px',
});

export const Logo = styled(LogoBase)({
  width: '100%',
  marginBottom: '3rem',
});
