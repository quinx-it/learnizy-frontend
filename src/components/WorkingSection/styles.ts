import { Box, styled } from '@mui/material';
import Image from 'next/image';

export const Container = styled(Box)(() => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
}));

export const ContentWrapper = styled(Box)(() => ({
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.5rem',
  textAlign: 'center',
}));

export const StyledImage = styled(Image)(({ theme }) => ({
  width: 'auto',
  height: 'auto',

  [theme.breakpoints.up('md')]: {
    maxWidth: '200px',
  },
}));

export const TextWrapper = styled(Box)(() => ({
  whiteSpace: 'pre-wrap',
}));
