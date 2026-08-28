import { Box, Typography, styled } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(1.5),

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
}));

export const HeaderContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  alignContent: 'baseline',
  gap: theme.spacing(1.5),
  color: theme.palette.primary.main,

  [theme.breakpoints.up('md')]: {
    gridColumn: 'span 2',
  },
}));

export const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  color: theme.palette.common.black,

  [theme.breakpoints.up('md')]: {
    fontSize: '24px',
  },
}));

export const HeaderSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '18px',

  [theme.breakpoints.up('md')]: {
    fontSize: '24px',
  },
}));

export const IconWrapper = styled(Box)(() => ({
  display: 'block',
}));

export const InterviewRecordsWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
  gridColumn: 'span 1',

  [theme.breakpoints.up('md')]: {
    gridColumn: 'span 2',
  },
}));
