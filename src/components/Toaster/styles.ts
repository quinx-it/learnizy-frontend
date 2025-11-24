import { Box, Button, styled } from '@mui/material';

export const ToastContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'bg' && prop !== 'text',
})<{ bg: string; text: string }>(({ bg, text }) => ({
  display: 'flex',
  maxWidth: '400px',
  minWidth: '320px',
  alignItems: 'flex-start',
  gap: '0.75rem',
  borderRadius: '1rem',
  padding: '1rem',
  backgroundColor: bg,
  color: text,
}));

export const IconWrapper = styled(Box)(() => ({
  fontSize: '24px',
  marginTop: '0.5rem',
}));

export const ContentWrapper = styled(Box)(() => ({
  flex: 1,
}));

export const Title = styled(Box)(() => ({
  marginBottom: '0.25rem',
  fontSize: '16px',
  lineHeight: '22px',
  fontWeight: 700,
}));

export const Description = styled(Box)(() => ({
  fontSize: '12px',
}));

export const CloseButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'text',
})<{ text: string }>(({ text }) => ({
  marginTop: '0.5rem',
  border: 0,
  backgroundColor: 'transparent',
  color: text,
  fontSize: '24px',
  padding: 0,
  minWidth: 'auto',
  textTransform: 'none',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: 'none',
  },
}));
