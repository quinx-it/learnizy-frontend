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
    grey: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
    link: {
      main: '#2563eb',
    },
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
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1440,
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
