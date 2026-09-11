import { Box, Button as MuiButton, styled } from '@mui/material';

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: '100%',
  maxWidth: '659px',
  marginTop: theme.spacing(2),
  gap: theme.spacing(1),
  overflowX: 'auto',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  paddingBottom: theme.spacing(0.5),

  '&::-webkit-scrollbar': {
    display: 'none',
  },

  [theme.breakpoints.up('md')]: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflowX: 'visible',
  },
}));

export const SuggestionButton = styled(MuiButton)(({ theme }) => ({
  flexShrink: 0,
  minHeight: '44px',
  gap: theme.spacing(1),
  borderRadius: '50px',
  border: `1px solid ${theme.palette.grey[200]}`,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  fontSize: '14px',
  fontWeight: 500,
  textTransform: 'none',
  whiteSpace: 'nowrap',
  boxShadow: 'none',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  transition: 'background-color 0.2s ease-in-out, border-color 0.2s ease-in-out',

  '&:hover': {
    backgroundColor: theme.palette.grey[100],
    borderColor: theme.palette.primary.main,
    boxShadow: 'none',
  },

  '&:disabled': {
    opacity: 0.6,
  },
}));

export const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.main,
}));
