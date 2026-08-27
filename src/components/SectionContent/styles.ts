import { Box, styled } from '@mui/material';

import { type ElementType } from 'react';

export const Container = styled(Box)<{ component?: ElementType }>(({ theme }) => ({
  width: '100%',
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2.5),
  paddingTop: theme.spacing(7),
  paddingBottom: theme.spacing(7),

  [theme.breakpoints.up('md')]: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    paddingTop: theme.spacing(10),
    paddingBottom: theme.spacing(10),
  },

  [theme.breakpoints.up('xl')]: {
    paddingLeft: '150px',
    paddingRight: '150px',
    paddingTop: '96px',
    paddingBottom: '96px',
  },
}));
