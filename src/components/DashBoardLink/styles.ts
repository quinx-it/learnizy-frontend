import { Box, styled } from '@mui/material';
import { shouldForwardProp } from '@mui/system';

import Button from '@/components/Button';
import Link from '@/components/Link';

export const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isActive',
})<{ isActive: boolean }>(({ theme, isActive }) => ({
  justifyContent: 'flex-start',
  border: 0,
  fontSize: '16px',
  backgroundColor: isActive ? theme.palette.info.main : 'transparent',
}));

export const StyledLink = styled(Link)(() => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
}));

export const IconWrapper = styled(Box)(({ theme }) => ({
  marginRight: '0.625rem',
  height: '20px',
  width: '20px',
  color: theme.palette.text.primary,
}));
