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
  borderImageSource: `linear-gradient(270deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.main} 35%, ${theme.palette.primary.main} 65%, ${theme.palette.background.paper} 100%)`,
  width: '100%',
  marginBottom: 0,
}));

export const Title = styled(Typography)(({ theme }) => ({
  padding: `${theme.spacing(1.25)} 0`,
  textAlign: 'center',
  fontWeight: 700,
  color: theme.palette.primary.main,
  textShadow: `1px 1px 2px ${theme.palette.common.black}1A`,
  marginBottom: 0,

  [theme.breakpoints.up('md')]: {
    fontSize: '1.25rem',
  },
}));
