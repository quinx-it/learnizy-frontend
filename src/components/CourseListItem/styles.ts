import { Box, styled } from '@mui/material';

import Button from '@/components/Button';
import { Text } from '@/components/Typography';

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '0.5rem',

  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: '1rem',
  },
}));

export const ContentWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  gap: '0.25rem',

  [theme.breakpoints.up('sm')]: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: '1rem',
  },
}));

export const ModuleWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.5rem',

  [theme.breakpoints.up('sm')]: {
    gap: '1rem',
  },
}));

export const TitleWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  wordBreak: 'break-word',

  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

export const StyledModuleText = styled(Text)(({ theme }) => ({
  fontSize: '12px',
  lineHeight: '16px',
  whiteSpace: 'nowrap',

  [theme.breakpoints.up('sm')]: {
    fontSize: '16px',
    lineHeight: '22px',
  },
}));

export const StyledTitleText = styled(Text)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isBlocked',
})<{ isBlocked?: boolean }>(({ theme, isBlocked }) => ({
  height: '32px',
  width: '128px',
  flexShrink: 0,
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  paddingTop: theme.spacing(0.25),
  paddingBottom: theme.spacing(0.25),

  ...(isBlocked && {
    cursor: 'not-allowed',
    opacity: 0.5,
  }),
}));
