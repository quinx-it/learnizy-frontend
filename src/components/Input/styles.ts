import { Box, styled } from '@mui/material';

export const LabelWrapper = styled(Box)(() => ({
  marginBottom: '0.375rem',
}));

export const StyledInput = styled('input', {
  shouldForwardProp: (prop) => prop !== 'hasError',
})<{ hasError?: boolean }>(({ theme, hasError }) => ({
  backgroundColor: theme.palette.background.default,
  display: 'flex',
  height: '36px',
  width: '100%',
  minWidth: 0,
  borderRadius: '50px',
  border: `1px solid ${theme.palette.divider}`,
  paddingLeft: '20px',
  paddingRight: '20px',
  paddingTop: '0.125rem',
  paddingBottom: '0.125rem',
  fontSize: '16px',
  fontWeight: 500,
  color: theme.palette.text.primary,
  transition: 'color 0.2s ease-in-out',
  outline: 'none',

  '&::placeholder': {
    color: `${theme.palette.text.primary}80`,
  },

  '&:disabled': {
    color: theme.palette.grey[500],

    '&::placeholder': {
      color: theme.palette.grey[500],
    },
    pointerEvents: 'none',
    cursor: 'not-allowed',
  },
  ...(hasError && {
    color: `${theme.palette.error.main} !important`,
    borderColor: `${theme.palette.error.main} !important`,
  }),

  '@media (min-width: 768px)': {
    fontSize: '0.875rem',
  },
}));

export const ErrorText = styled(Box)(() => ({
  marginLeft: '20px',

  '& > *': {
    color: 'inherit',
  },
}));
