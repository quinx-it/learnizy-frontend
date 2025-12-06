import { Box, Button as MuiButton, styled } from '@mui/material';

import Link from '@/components/Link';

export const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  textTransform: 'none',
  boxShadow: 'none',
  borderRadius: '50px',
  backgroundColor: isActive ? theme.palette.primary.main : theme.palette.common.white,
  color: isActive ? theme.palette.common.white : theme.palette.common.black,
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5),
  paddingTop: theme.spacing(0.75),
  paddingBottom: theme.spacing(0.75),
  fontSize: '12px',
  lineHeight: '16px',
  width: '100%',
  justifyContent: 'flex-start',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.625),

  '&:hover': {
    backgroundColor: isActive ? theme.palette.primary.dark : theme.palette.primary.main,
    color: theme.palette.common.white,
    boxShadow: 'none',
  },
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: theme.spacing(0.625),
  border: 0,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(1.25),
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  textDecoration: 'none',
  width: '100%',
}));

export const IconWrapper = styled(Box)(() => ({
  width: '16px',
  height: '16px',
  flexShrink: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '& .icon-wrapper': {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    '& svg': {
      width: '16px',
      height: '16px',
      display: 'block',
    },
  },
}));

export const StyledText = styled(Box)(({ theme }) => ({
  color: 'inherit',
  fontSize: '14px',
  lineHeight: '22px',
  fontWeight: 500,
  display: 'block',

  [theme.breakpoints.up('md')]: {
    display: 'none',
  },

  [theme.breakpoints.up('lg')]: {
    display: 'block',
  },
}));
