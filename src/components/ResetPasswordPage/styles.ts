import { Box, styled } from '@mui/material';

export const Container = styled(Box)(() => ({
  display: 'flex',
  height: '100dvh',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const CardWrapperContainer = styled(Box)(() => ({
  maxWidth: '472px',
  paddingLeft: '2rem',
  paddingRight: '2rem',
  paddingTop: '4rem',
  paddingBottom: '4rem',
}));

export const LogoWrapper = styled(Box)(() => ({
  marginBottom: '3rem',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
}));

export const HeadingWrapper = styled(Box)(() => ({
  marginBottom: '0.5rem',
}));

export const TextWrapper = styled(Box)(() => ({
  marginBottom: '1.5rem',
}));
