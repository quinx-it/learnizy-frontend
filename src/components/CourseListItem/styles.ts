import { Box, styled } from '@mui/material';

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
