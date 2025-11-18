import { Box, styled } from '@mui/material';

import Input from '@/components/Input';
import Link from '@/components/Link';

export const Container = styled(Box)(() => ({
  width: '100%',
}));

export const Form = styled('form')(() => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  gap: '1.5rem',
}));

export const HeadingContainer = styled(Box)(() => ({
  marginBottom: '0.5rem',
}));

export const TextContainer = styled(Box)(() => ({
  marginBottom: '1.5rem',
}));

export const EmailText = styled('span')(() => ({
  fontWeight: 500,
  color: '#000000',
}));

export const VerificationInput = styled(Input)(() => ({
  '& input': {
    textAlign: 'center',
    fontSize: '1.5rem',
    letterSpacing: '0.1em',
  },
}));

export const ResendText = styled(Box)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.grey[500],
}));

export const ResendButton = styled('button')(({ theme }) => ({
  color: theme.palette.link.main,
  backgroundColor: 'transparent',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  fontSize: 'inherit',
  '&:hover': {
    textDecoration: 'underline',
  },
  '&:disabled': {
    color: theme.palette.grey[400],
    textDecoration: 'none',
    cursor: 'not-allowed',
  },
}));

export const CheckboxContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
}));

export const ErrorText = styled('p')(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: '12px',
}));

export const LinkStyled = styled(Link)(() => ({
  display: 'inline',
  textDecoration: 'underline !important',
}));
