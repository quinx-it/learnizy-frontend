import { Box, Button as MuiButton, styled } from '@mui/material';

import Link from '@/components/Link';
import { Heading } from '@/components/Typography';

export const Container = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  position: 'relative',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(1),
  textAlign: 'center',
}));

export const NotFoundNumber = styled(Box)(({ theme }) => ({
  fontSize: '200px',
  lineHeight: 'auto',
  color: theme.palette.info.main,
  opacity: 0.6,
  fontWeight: 'bold',
  margin: 0,

  [theme.breakpoints.up('md')]: {
    fontSize: '300px',
    lineHeight: '270px',
  },
}));

export const NotFoundTitle = styled(Heading)(({ theme }) => ({
  marginTop: theme.spacing(1.25),
  color: theme.palette.text.secondary,
  fontWeight: 500,
}));

export const AstronautImage = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: '20%',
  bottom: '28.57%',
  maxWidth: '132px',
  transform: 'translateX(20%)',

  [theme.breakpoints.up('md')]: {
    maxWidth: '192px',
  },

  '& img': {
    width: '100%',
    height: 'auto',
  },
}));

export const StyledLinkButton = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  margin: '0 auto',
  marginTop: theme.spacing(2),
  maxWidth: '141px',
  display: 'inline-block',
}));

export const StyledButton = styled(MuiButton)(({ theme }) => ({
  textTransform: 'none',
  boxShadow: 'none',
  borderRadius: '50px',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2.5),
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  fontSize: '16px',
  lineHeight: '22px',
  position: 'relative',
  overflow: 'hidden',
  width: '100%',

  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: 'none',
    color: theme.palette.common.white,
  },
}));
