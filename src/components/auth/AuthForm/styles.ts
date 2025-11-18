import { Box, styled } from '@mui/material';

import Link from '@/components/Link';

export const Form = styled('form')(() => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  gap: '1.5rem',
}));

export const LinksRow = styled(Box)(() => ({
  marginTop: '-1rem',
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  fontSize: '12px',
}));

export const AuthLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'underline',
}));
