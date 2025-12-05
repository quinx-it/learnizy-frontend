import { styled, keyframes } from '@mui/material';

import type { ButtonSize, ButtonVariant } from './typings';

const rippleAnimation = keyframes`
  to {
    transform: scale(4);
    opacity: 0;
  }
`;

export const StyledButton = styled('button', {
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'size',
})<{ variant?: ButtonVariant; size?: ButtonSize }>(
  ({ theme, variant = 'blue', size = 'large' }) => ({
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    color:
      variant === 'yellow' || variant === 'white'
        ? theme.palette.text.primary
        : theme.palette.primary.contrastText,
    borderRadius: '50px',
    outline: 'none',
    border: 'none',
    cursor: 'pointer',
    transition:
      'color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out',
    fontWeight: 400,

    '&:focus': {
      outline: 'none',
      boxShadow: 'none',
    },

    '&:disabled': {
      cursor: 'not-allowed',
    },

    ...(variant === 'blue' && {
      backgroundColor: theme.palette.primary.main,

      '&:hover:not(:disabled)': {
        backgroundColor: theme.palette.primary.dark,
      },

      '&:disabled': {
        backgroundColor: theme.palette.info.main,
      },
    }),

    ...(variant === 'yellow' && {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.text.primary,

      '&:hover:not(:disabled)': {
        backgroundColor: 'var(--yellow)',
      },
    }),

    ...(variant === 'white' && {
      backgroundColor: theme.palette.background.default,
      border: `1px solid ${theme.palette.primary.main}`,
      color: theme.palette.text.primary,

      '&:hover:not(:disabled)': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      },

      '&:active:not(:disabled)': {
        borderColor: theme.palette.primary.main,
        [theme.breakpoints.up('md')]: {
          color: theme.palette.primary.contrastText,
        },
      },

      '&:disabled': {
        borderColor: theme.palette.grey[400],
        color: theme.palette.grey[400],
      },
    }),

    ...(variant === 'red' && {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,

      '&:hover:not(:disabled)': {
        backgroundColor: theme.palette.primary.dark,
      },
    }),

    ...(variant === 'green' && {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,

      '&:hover:not(:disabled)': {
        backgroundColor: theme.palette.primary.dark,
      },
    }),

    ...(variant === 'gray' && {
      backgroundColor: theme.palette.info.main,
      color: theme.palette.primary.contrastText,

      '&:hover:not(:disabled)': {
        backgroundColor: theme.palette.primary.main,
      },
    }),

    ...(size === 'large' && {
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      paddingTop: theme.spacing(1.5),
      paddingBottom: theme.spacing(1.5),
      fontSize: '20px',
      lineHeight: '27px',
    }),

    ...(size === 'medium' && {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      fontSize: '16px',
      lineHeight: '22px',
    }),

    ...(size === 'small' && {
      paddingLeft: theme.spacing(2.5),
      paddingRight: theme.spacing(2.5),
      paddingTop: theme.spacing(0.75),
      paddingBottom: theme.spacing(0.75),
      fontSize: '12px',
      lineHeight: '16px',
    }),

    ...(size === 'icon' && {
      width: theme.spacing(9),
      height: theme.spacing(9),
      padding: 0,
    }),

    '& .ripple': {
      position: 'absolute',
      borderRadius: '50%',
      backgroundColor: 'currentColor',
      transform: 'scale(0)',
      animation: `${rippleAnimation} 0.6s linear`,
      pointerEvents: 'none',
      zIndex: 0,
      opacity: 0.3,
    },

    '&[data-variant="blue"] .ripple': {
      opacity: 0.3,
    },

    '&[data-variant="yellow"] .ripple': {
      opacity: 0.1,
    },

    '&[data-variant="white"] .ripple': {
      opacity: 0.2,
    },
  }),
);
