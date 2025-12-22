import { Box, styled } from '@mui/material';

import { Text } from '@/components/Typography';

export const LabelWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(0.375),
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
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2.5),
  paddingTop: theme.spacing(0.125),
  paddingBottom: theme.spacing(0.125),
  fontSize: '16px',
  fontWeight: 500,
  color: theme.palette.text.primary,
  transition: 'color 0.2s ease-in-out',
  outline: 'none',

  '&::placeholder': {
    color: 'rgba(12, 12, 12, 0.5)',
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
    color: theme.palette.error.main,
    borderColor: theme.palette.error.main,
  }),

  '@media (min-width: 768px)': {
    fontSize: '0.875rem',
  },
}));

export const ErrorText = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(2.5),

  '& > *': {
    color: 'inherit',
  },
}));

export const MediumText = styled(Text)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const ErrorTextContent = styled(Text)(({ theme }) => ({
  color: theme.palette.error.main,
}));
