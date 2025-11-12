import '@mui/material/styles';
import type { PaletteColor, PaletteColorOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface IBreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    '2xl': true;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface BreakpointOverrides extends IBreakpointOverrides {}

  interface IPalette {
    link: PaletteColor;
    gray: string;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface Palette extends IPalette {}

  interface IPaletteOptions {
    link?: PaletteColorOptions;
    gray?: string;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface PaletteOptions extends IPaletteOptions {}
}
