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
  paddingLeft: theme.spacing(0.5),
  paddingTop: theme.spacing(0.5),
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
  paddingRight: theme.spacing(3.5),

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
  right: theme.spacing(0.75),
  bottom: theme.spacing(0.25),
  fontSize: theme.typography.body2.fontSize,
  color: theme.palette.grey[500],
}));

export const ErrorText = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(0.25),
  marginLeft: theme.spacing(0.5),

  '& > *': {
    color: `${theme.palette.error.main} !important`,
  },
}));
