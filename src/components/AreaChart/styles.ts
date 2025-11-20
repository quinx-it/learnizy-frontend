import { Box, styled } from '@mui/material';

export const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  overflow: 'auto',
}));

export const ChartContainerStyled = styled(Box)(() => ({
  maxHeight: '180',
  width: '100%',
  minWidth: '500',
}));
