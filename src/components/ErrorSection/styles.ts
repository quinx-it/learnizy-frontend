import { Box, Button, Typography, styled } from '@mui/material';

export const Container = styled(Box)(() => ({
  display: 'flex',
  height: '100vh',
  alignItems: 'center',
}));

export const ContentWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.25rem',
  textAlign: 'center',
  color: theme.palette.text.primary,
}));

export const ImageWrapper = styled(Box)(({ theme }) => ({
  '& img': {
    maxWidth: '110px',
  },
  [theme.breakpoints.down('md')]: {
    '& img': {
      maxWidth: 'none',
    },
  },
}));

export const TextContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
}));

export const Title = styled(Typography)(() => ({
  fontSize: '24px',
  lineHeight: '26px',
  fontWeight: 700,
}));

export const Description = styled(Typography)(() => ({
  fontSize: '16px',
  lineHeight: '22px',
  fontWeight: 500,
  whiteSpace: 'pre-wrap',
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  boxShadow: 'none',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,

  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: 'none',
  },
}));
