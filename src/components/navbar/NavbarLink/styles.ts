import { Box, styled } from '@mui/material';

import Link from '@/components/Link';

export const StyledLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: theme.spacing(0.625),
  border: 0,
  paddingLeft: theme.spacing(1.25),
  paddingRight: theme.spacing(1.25),
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
}));

export const IconWrapper = styled(Box)(() => ({
  width: '16px',
  height: '16px',
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledText = styled(Box)(({ theme }) => ({
  color: 'inherit',
  fontSize: '12px',
  lineHeight: '16px',
  fontWeight: 500,
  display: 'block',

  [theme.breakpoints.up('md')]: {
    display: 'none',
  },

  [theme.breakpoints.up('lg')]: {
    display: 'block',
  },
}));
