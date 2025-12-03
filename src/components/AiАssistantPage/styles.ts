import { Box, styled } from '@mui/material';
import Image from 'next/image';

export const Container = styled(Box)(() => ({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
}));

export const ImageContainer = styled(Box)(() => ({
  position: 'relative',
  height: '178px',
  width: '264px',
}));

export const StyledImage = styled(Image)(() => ({
  objectFit: 'contain',
}));

export const WelcomeText = styled(Box)(() => ({
  marginTop: '3rem',
  marginBottom: '1.625rem',
  textAlign: 'center',

  '& > *': {
    fontSize: '1.875rem',
    lineHeight: '2.25rem',
  },
}));
