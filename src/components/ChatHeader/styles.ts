import { Box, styled, Typography } from '@mui/material';

export const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
}));

export const Divider = styled(Box)(({ theme }) => ({
  height: 1,
  borderBottom: '1px solid',
  borderImageSlice: 1,
  borderImageSource: 'linear-gradient(270deg, #F2FCFF 0%, #248EAB 35%, #248EAB 65%, #F2FCFF 100%)',
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '100%',

  [theme.breakpoints.up('md')]: {
    width: '80%',
  },

  [theme.breakpoints.up('sm')]: {
    width: '50%',
  },
}));

export const Title = styled(Typography)(({ theme }) => ({
  padding: '20px 0',
  textAlign: 'center',
  fontWeight: 700,
  color: '#248eab',
  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',

  [theme.breakpoints.up('md')]: {
    fontSize: '1.25rem',
  },
}));
