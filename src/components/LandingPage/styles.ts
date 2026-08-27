import { Box, styled } from '@mui/material';
import { type ElementType } from 'react';

export const Main = styled(Box)<{ component?: ElementType }>(() => ({
  margin: 0,
  width: '100%',
  padding: 0,
}));

// Header and hero share one dark band so the teal glow runs across both
// without a seam between them.
export const TopBand = styled(Box)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: theme.palette.common.black,

  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-22%',
    left: '-10%',
    width: '58%',
    paddingBottom: '58%',
    borderRadius: '50%',
    background: `radial-gradient(circle, ${theme.palette.primary.main} 0%, transparent 70%)`,
    opacity: 0.22,
    pointerEvents: 'none',
  },
}));
