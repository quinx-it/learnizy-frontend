import { Box, styled } from '@mui/material';
import Image from 'next/image';

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '1rem',

  [theme.breakpoints.up('md')]: {
    justifyContent: 'center',
  },
}));

export const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '132px',
  width: '196px',
  maxWidth: '100%',

  [theme.breakpoints.up('md')]: {
    height: '178px',
    width: '264px',
  },
}));

export const StyledImage = styled(Image)(() => ({
  objectFit: 'contain',
}));

export const WelcomeText = styled(Box)(({ theme }) => ({
  marginTop: '1rem',
  marginBottom: '1.25rem',
  textAlign: 'center',

  '& > *': {
    fontSize: '1.5rem',
    lineHeight: '1.9rem',
  },

  [theme.breakpoints.up('md')]: {
    marginTop: '2rem',
    marginBottom: '1.625rem',

    '& > *': {
      fontSize: '1.875rem',
      lineHeight: '2.25rem',
    },
  },
}));
