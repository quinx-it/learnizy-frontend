import { createTheme } from '@mui/material/styles';

import cssBaselineConfig from './cssBaseline';

const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: '#0c0c0c',
      secondary: '#238ba7',
    },
    primary: {
      main: '#238ba7',
      contrastText: '#fafafa',
    },
    secondary: {
      main: '#f9dd69',
      contrastText: '#0c0c0c',
    },
    error: {
      main: '#e64444',
    },
    warning: {
      main: '#e9bf25',
    },
    success: {
      main: '#b4e925',
    },
    info: {
      main: '#a9dbe9',
    },
    divider: '#a9dbe9',
  },

  typography: {
    fontFamily: ['Involve', 'Montserrat', 'sans-serif'].join(','),
    h1: { fontWeight: 500 },
    h2: { fontWeight: 500 },
    h3: { fontWeight: 500 },
    h4: { fontWeight: 500 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
    body1: { fontWeight: 400 },
    body2: { fontWeight: 400 },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 1024,
      lg: 1440,
      xl: 1920,
    },
  },

  shape: {
    borderRadius: 12,
  },
});

theme.components = {
  ...cssBaselineConfig(theme),
};

export { theme };
