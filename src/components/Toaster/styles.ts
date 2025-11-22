import { Box, styled } from '@mui/material';

export const ToastContainer = styled(Box)<{ $bg: string; $text: string }>(({ $bg, $text }) => ({
  display: 'flex',
  maxWidth: '400px',
  minWidth: '320px',
  alignItems: 'flex-start',
  gap: '0.75rem',
  borderRadius: '1rem',
  padding: '1rem',
  backgroundColor: $bg,
  color: $text,
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

export const CloseButton = styled('button')<{ $text: string }>(({ $text }) => ({
  marginTop: '0.5rem',
  cursor: 'pointer',
  border: 0,
  backgroundColor: 'transparent',
  color: $text,
  fontSize: '24px',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
