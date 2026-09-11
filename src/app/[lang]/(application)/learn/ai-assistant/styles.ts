import { styled, Box } from '@mui/material';

export const LayoutGrid = styled(Box)(() => ({
  display: 'grid',
  height: '100%',
  width: '100%',
  gridTemplateColumns: '1fr auto',
}));

export const ContentWrapper = styled(Box)(() => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}));
