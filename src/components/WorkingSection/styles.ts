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
  width: '120px',
  height: '120px',
  objectFit: 'contain',

  [theme.breakpoints.down('md')]: {
    width: '110px',
    height: '105px',
  },
}));

export const TextWrapper = styled(Box)(() => ({
  whiteSpace: 'pre-wrap',
}));
