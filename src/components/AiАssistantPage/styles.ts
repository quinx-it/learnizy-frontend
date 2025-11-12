import { styled } from '@mui/material';

export const Container = styled('div')(() => ({
  display: 'flex',
  flex: 1,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
}));

export const ImageContainer = styled('div')(() => ({
  position: 'relative',
  height: '178px',
  width: '264px',
}));

export const WelcomeText = styled('div')(() => ({
  marginTop: '3rem',
  marginBottom: '1.625rem',
  textAlign: 'center',
  '& > *': {
    fontSize: '1.875rem !important',
    lineHeight: '2.25rem !important',
  },
}));
