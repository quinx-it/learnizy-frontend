import { Box, styled, Typography } from '@mui/material';

export const StyledChartContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  aspectRatio: '16 / 9',
  justifyContent: 'center',
  fontSize: '0.75rem',
  lineHeight: '1rem',

  '& .recharts-cartesian-axis-tick text': {
    fill: theme.palette.text.secondary,
  },

  '& .recharts-cartesian-grid line[stroke="#ccc"]': {
    stroke: 'rgba(169, 219, 233, 0.5)',
  },

  '& .recharts-curve.recharts-tooltip-cursor': {
    stroke: theme.palette.divider,
  },

  '& .recharts-polar-grid [stroke="#ccc"]': {
    stroke: theme.palette.divider,
  },

  '& .recharts-radial-bar-background-sector': {
    fill: theme.palette.info.main,
  },

  '& .recharts-rectangle.recharts-tooltip-cursor': {
    fill: theme.palette.info.main,
  },

  '& .recharts-reference-line [stroke="#ccc"]': {
    stroke: theme.palette.divider,
  },

  '& .recharts-dot[stroke="#fff"]': {
    stroke: 'transparent',
  },

  '& .recharts-layer': {
    outline: 'none',
  },

  '& .recharts-sector': {
    outline: 'none',
  },

  '& .recharts-sector[stroke="#fff"]': {
    stroke: 'transparent',
  },

  '& .recharts-surface': {
    outline: 'none',
  },
}));

export const TooltipContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  minWidth: '8rem',
  alignItems: 'flex-start',
  gap: '0.375rem',
  borderRadius: theme.shape.borderRadius,
  border: '1px solid rgba(169, 219, 233, 0.5)',
  backgroundColor: theme.palette.background.paper,
  paddingLeft: '0.625rem',
  paddingRight: '0.625rem',
  paddingTop: '0.375rem',
  paddingBottom: '0.375rem',
  fontSize: '0.75rem',
  lineHeight: '1rem',
  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
}));

export const TooltipLabel = styled(Typography)(() => ({
  fontWeight: 500,
}));

export const TooltipContentWrapper = styled(Box)(() => ({
  display: 'grid',
  gap: '0.375rem',
}));

export const TooltipItemWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'indicator',
})<{ indicator?: 'dot' | 'line' | 'dashed' }>(({ indicator }) => ({
  display: 'flex',
  width: '100%',
  flexWrap: 'wrap',
  alignItems: 'stretch',
  gap: '0.5rem',

  '& > svg': {
    color: 'inherit',
    height: '0.625rem',
    width: '0.625rem',
  },

  ...(indicator === 'dot' && {
    alignItems: 'center',
  }),
}));

export const TooltipIndicator = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'indicator' && prop !== 'nestLabel',
})<{
  indicator?: 'dot' | 'line' | 'dashed';
  nestLabel?: boolean;
}>(({ indicator, nestLabel }) => ({
  flexShrink: 0,
  borderRadius: '2px',
  border: `1px solid var(--color-border)`,
  backgroundColor: 'var(--color-bg)',

  ...(indicator === 'dot' && {
    height: '0.625rem',
    width: '0.625rem',
  }),

  ...(indicator === 'line' && {
    width: '0.25rem',
  }),

  ...(indicator === 'dashed' && {
    width: 0,
    border: '1.5px dashed var(--color-border)',
    backgroundColor: 'transparent',
    ...(nestLabel && {
      marginTop: '0.125rem',
      marginBottom: '0.125rem',
    }),
  }),
}));

export const TooltipItemContent = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'nestLabel',
})<{ nestLabel?: boolean }>(({ nestLabel }) => ({
  minWidth: 0,
  display: 'flex',
  flex: 1,
  justifyContent: 'space-between',
  lineHeight: '1.5',
  ...(nestLabel
    ? {
        alignItems: 'flex-end',
      }
    : {
        alignItems: 'center',
      }),
}));

export const TooltipItemLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const TooltipItemValue = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontFamily: 'monospace',
  fontWeight: 500,
  fontVariantNumeric: 'tabular-nums',
}));

export const TooltipItemLabelWrapper = styled(Box)(() => ({
  display: 'grid',
  gap: '0.375rem',
}));

export const LegendContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'verticalAlign',
})<{ verticalAlign?: 'top' | 'bottom' | 'middle' }>(({ verticalAlign }) => {
  let paddingStyles = {};

  if (verticalAlign === 'top') {
    paddingStyles = {
      paddingBottom: '0.75rem',
    };
  } else if (verticalAlign === 'middle') {
    paddingStyles = {
      paddingTop: '0.375rem',
      paddingBottom: '0.375rem',
    };
  } else {
    paddingStyles = {
      paddingTop: '0.75rem',
    };
  }

  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem',
    ...paddingStyles,
  };
});

export const LegendItem = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.375rem',

  '& > svg': {
    color: 'inherit',
    height: '0.75rem',
    width: '0.75rem',
  },
}));

export const LegendIndicator = styled(Box)(() => ({
  height: '0.5rem',
  width: '0.5rem',
  flexShrink: 0,
  borderRadius: '2px',
}));
