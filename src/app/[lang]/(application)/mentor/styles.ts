import { styled, Box } from '@mui/material';

export const LayoutGrid = styled(Box)(() => ({
  backgroundColor: 'var(--accent-background)',
  display: 'grid',
  minHeight: '100dvh',
  gridTemplateColumns: 'auto 1fr',
}));

export const Content = styled('main')(() => ({
  height: '100%',
  maxHeight: '100dvh',
  width: '100%',
  overflowY: 'auto',
  paddingInline: '1.875rem',
  paddingBlock: '1.25rem',
}));
