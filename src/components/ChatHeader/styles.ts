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
  paddingTop: theme.spacing(1.25),
  paddingBottom: theme.spacing(1.25),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  minWidth: 0,
  maxWidth: '100%',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 1.4,
  fontWeight: 700,
  color: theme.palette.primary.main,
  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
  marginBottom: 0,
  overflowWrap: 'anywhere',
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',

  [theme.breakpoints.up('md')]: {
    fontSize: '1.25rem',
  },
}));
