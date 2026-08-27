import { Box, styled } from '@mui/material';

import { type ElementType } from 'react';

export const Main = styled(Box)<{ component?: ElementType }>(() => ({
  margin: 0,
  width: '100%',
  padding: 0,
}));
