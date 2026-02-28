import { Box, styled } from '@mui/material';

export const CoursesGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(1),
  alignItems: 'stretch',

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
}));

export const PageContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const CourseCardWrapper = styled(Box)(() => ({
  height: '100%',
  width: '100%',
  maxWidth: '100%',
}));
