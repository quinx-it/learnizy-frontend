import { Box, styled } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

export const ChartContainerStyled = styled(Box)(({ theme }) => ({
  maxHeight: '180px',
  width: '100%',

  '& .recharts-xAxis .recharts-cartesian-axis-tick text': {
    fill: theme.palette.common.black,
  },
}));
