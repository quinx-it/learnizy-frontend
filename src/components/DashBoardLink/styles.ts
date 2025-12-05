import { Box, styled } from '@mui/material';

import Link from '@/components/Link';

export const StyledLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive?: boolean }>(({ theme, isActive }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  justifyContent: 'flex-start',
  border: 'none',
  fontSize: '16px',
  backgroundColor: isActive ? theme.palette.info.main : 'transparent',
  borderRadius: '50px',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),
  width: '100%',
  transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',
  color: theme.palette.text.primary,

  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,

    '& *': {
      color: theme.palette.common.white,
    },
  },
}));

export const IconWrapper = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(0.625),
  height: '20px',
  width: '20px',
  color: theme.palette.text.primary,
  transition: 'color 0.2s ease-in-out',
}));
