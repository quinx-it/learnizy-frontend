import { Box, styled } from '@mui/material';

export const Container = styled(Box)(() => ({
  position: 'relative',
  display: 'flex',
  height: '100vh',
  width: '100%',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: '1.25rem',
  paddingRight: '1.25rem',
}));

export const MessagesContainer = styled(Box)(() => ({
  display: 'flex',
  width: '100%',
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'auto',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));

export const Spacer = styled(Box)(() => ({
  marginBottom: '1rem',
  display: 'flex',
  height: '2.25rem',
  width: '100%',
  justifyContent: 'center',
}));

export const InputContainer = styled(Box)(() => ({
  position: 'absolute',
  bottom: 0,
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  backgroundColor: 'transparent',
  padding: '1rem',
}));
