import { type Theme } from '@mui/material';

const cssBaselineConfig = (theme: Theme) => ({
  MuiCssBaseline: {
    styleOverrides: {
      html: {
        scrollBehavior: 'smooth',
        maxWidth: '100%',
      },
      body: {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        fontFamily: 'Involve, Montserrat, sans-serif',
      },
      a: {
        textDecoration: 'none',
      },
      '*': {
        boxSizing: 'border-box',
      },
      '*::-webkit-scrollbar': {
        width: 6,
        height: 6,
      },
      '*::-webkit-scrollbar-track': {
        background: theme.palette.background.default,
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: theme.palette.divider,
        borderRadius: 6,
        transition: 'background-color 0.3s ease',
      },
      '*::-webkit-scrollbar-thumb:hover': {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
});

export default cssBaselineConfig;
