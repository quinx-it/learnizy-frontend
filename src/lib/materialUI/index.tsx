'use client';

import { ThemeProvider as ThemeProviderBase, CssBaseline } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

import { theme } from './theme';

const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProviderBase theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProviderBase>
  );
};

export default ThemeProvider;
