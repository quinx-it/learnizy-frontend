import { Box, styled } from '@mui/material';

export const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const AnalyticsGrid = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(1.5),
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(1.5),

  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
}));

export const GrowthChartContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  marginBottom: theme.spacing(1.5),
  width: '400px',
  maxWidth: '100%',
}));

export const ProgressContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

export const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  fontSize: '14px',
  color: theme.palette.grey[600],
}));

export const StatsRow = styled(Box)(() => ({
  display: 'block',
}));

export const StatsValue = styled(Box)(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
}));
