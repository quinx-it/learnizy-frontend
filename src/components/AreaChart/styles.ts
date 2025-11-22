import { Box, styled } from '@mui/material';

export const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
}));

export const ChartContainerStyled = styled(Box)(() => ({
  maxHeight: '180px',
  width: '100%',
}));
