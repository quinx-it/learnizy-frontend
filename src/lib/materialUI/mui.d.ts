import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    '2xl': true;
  }

  interface Palette {
    link: Palette['primary'];
  }

  interface PaletteOptions {
    link?: PaletteOptions['primary'];
  }
}
