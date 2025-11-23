import { Box, Divider as MuiDivider, styled } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '1rem',

  [theme.breakpoints.up('xl')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
}));

export const CourseTitle = styled(Box)(() => ({
  marginBottom: '1rem',
}));

export const CourseDivider = styled(MuiDivider)(({ theme }) => ({
  borderColor: theme.palette.gray,
  marginTop: 0,
  marginLeft: 0,
  marginRight: 0,
  marginBottom: '1rem',
}));

export const ModulesList = styled('ul')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  listStyle: 'none',
  margin: 0,
  padding: 0,
}));

export const StatisticsTitle = styled(Box)(() => ({
  marginBottom: '1rem',
}));

export const StatisticsDivider = styled(MuiDivider)(({ theme }) => ({
  borderColor: theme.palette.gray,
  marginTop: 0,
  marginLeft: 0,
  marginRight: 0,
  marginBottom: '1rem',
}));
