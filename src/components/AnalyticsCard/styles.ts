import { Box, styled } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  flex: 1,
  borderRadius: '0.5rem',
  border: `1px solid ${theme.palette.grey[300]}`,
  backgroundColor: '#ffffff',
  padding: '1.5rem',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
}));

export const Title = styled('h3')(({ theme }) => ({
  fontSize: '0.875rem',
  fontWeight: 500,
  color: theme.palette.grey[500],
}));

export const Content = styled(Box)(() => ({
  marginTop: '0.5rem',
}));

export const ValueWrapper = styled(Box)(() => ({
  marginTop: '0.5rem',
  display: 'flex',
  alignItems: 'baseline',
}));

export const Value = styled('p')(() => ({
  fontSize: '1.5rem',
  fontWeight: 600,
}));

export const Percentage = styled('p')<{ $isPositive: boolean }>(({ $isPositive }) => ({
  marginLeft: '0.5rem',
  display: 'flex',
  alignItems: 'baseline',
  fontSize: '12px',
  fontWeight: 600,
  color: $isPositive ? '#16a34a' : '#dc2626',
}));
