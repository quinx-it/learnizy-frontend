import { Box, styled } from '@mui/material';

import Button from '@/components/Button';
import Link from '@/components/Link';

export const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>(({ theme, isActive }) => ({
  justifyContent: 'flex-start',
  border: 0,
  fontSize: '16px',
  backgroundColor: isActive ? theme.palette.info.main : 'transparent',

  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`,
    boxShadow: 'none',
    '& *': {
      color: `${theme.palette.common.white} !important`,
    },
  },
}));

export const StyledLink = styled(Link)(() => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
}));

export const IconWrapper = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(0.625),
  height: '20px',
  width: '20px',
  color: theme.palette.text.primary,
  transition: 'color 0.2s ease-in-out',
}));
