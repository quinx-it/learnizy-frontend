import { Box, styled } from '@mui/material';

export const HeaderContainer = styled(Box)(() => ({
  marginBottom: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  gap: '0.5rem',
}));

export const TitleWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
}));

export const StatisticsWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
}));
