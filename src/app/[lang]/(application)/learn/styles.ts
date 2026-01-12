import { styled, Box } from '@mui/material';

export const LayoutGrid = styled(Box)(({ theme }) => ({
  backgroundColor: 'var(--accent-background)',
  display: 'grid',
  minHeight: '100vh',

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'auto 1fr',
  },
}));

export const MainContent = styled('main', {
  shouldForwardProp: (prop) => prop !== 'isAiPage',
})<{ isAiPage: boolean }>(({ theme, isAiPage }) => ({
  height: '100%',
  maxHeight: '100vh',
  width: '100%',
  overflowY: 'auto',
  paddingBlock: isAiPage ? 0 : '1.25rem',
  paddingInline: isAiPage ? 0 : '1rem',

  [theme.breakpoints.up('md')]: {
    paddingInline: isAiPage ? 0 : '1.875rem',
  },
}));

export const ChatHeaderWrapper = styled(Box)(({ theme }) => ({
  position: 'fixed',
  zIndex: 30,
  width: '100%',
  backgroundColor: 'var(--accent-background)',
  display: 'block',
  marginLeft: 0,

  [theme.breakpoints.up('md')]: {
    marginLeft: '2.5rem',
  },

  [theme.breakpoints.up('lg')]: {
    marginLeft: 0,
  },
}));
