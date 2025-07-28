'use client';

import { useMediaQuery } from 'react-responsive';

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1440,
} as const;

type BreakpointKey = keyof typeof breakpoints;

export function useBreakpoint<K extends BreakpointKey>(key: K) {
  const minWidth = breakpoints[key];

  const isAbove = useMediaQuery({ query: `(min-width: ${minWidth}px)` });
  const isBelow = useMediaQuery({ query: `(max-width: ${minWidth - 1}px)` });

  const capitalized = (key[0].toUpperCase() + key.slice(1)) as Capitalize<K>;

  return {
    [key]: minWidth,
    [`isAbove${capitalized}`]: isAbove,
    [`isBelow${capitalized}`]: isBelow,
  } as Record<K, number> &
    Record<`isAbove${Capitalize<K>}`, boolean> &
    Record<`isBelow${Capitalize<K>}`, boolean>;
}
