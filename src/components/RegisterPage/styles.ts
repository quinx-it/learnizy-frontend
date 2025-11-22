import { Box, styled } from '@mui/material';

export const Container = styled(Box)(() => ({
  display: 'flex',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const CardWrapperContainer = styled(Box)(() => ({
  maxWidth: '520px',
  paddingLeft: '2rem',
  paddingRight: '2rem',
  paddingTop: '6rem',
  paddingBottom: '6rem',
}));

export const LogoWrapper = styled(Box)(() => ({
  marginBottom: '3rem',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
}));
