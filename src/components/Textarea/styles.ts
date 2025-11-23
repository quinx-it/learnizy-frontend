import { Box, styled } from '@mui/material';

export const Container = styled(Box)(() => ({
  position: 'relative',
  width: '100%',
}));

export const Wrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'hasError',
})<{ hasError?: boolean }>(({ theme, hasError }) => ({
  backgroundColor: theme.palette.background.default,
  borderRadius: '12px',
  border: `1px solid ${theme.palette.divider}`,
  paddingLeft: '0.5rem',
  paddingTop: '0.5rem',
  paddingBottom: 0,
  ...(hasError && {
    borderColor: theme.palette.error.main,
  }),
}));

export const TextareaContainer = styled(Box)(() => ({
  position: 'relative',
}));

export const StyledTextarea = styled('textarea', {
  shouldForwardProp: (prop) => prop !== 'hasError',
})<{ hasError?: boolean }>(({ theme, hasError }) => ({
  width: '100%',
  fontSize: '16px',
  fontWeight: 500,
  color: theme.palette.text.primary,
  transition: 'color 0.2s ease-in-out',
  outline: 'none',

  '&::placeholder': {
    color: `${theme.palette.text.primary}80`,
  },
  height: '128px',
  resize: 'vertical',
  overflow: 'auto',
  paddingRight: '3.5rem',

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
  [theme.breakpoints.up('md')]: {
    fontSize: '0.875rem',
  },
}));

export const CounterWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: '0.75rem',
  bottom: '0.25rem',
  fontSize: '0.75rem',
  color: theme.palette.grey[500],
}));

export const ErrorText = styled(Box)(({ theme }) => ({
  marginTop: '0.25rem',
  marginLeft: '0.5rem',

  '& > *': {
    color: `${theme.palette.error.main} !important`,
  },
}));
