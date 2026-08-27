import { styled } from '@mui/material';

import Link from '@/components/Link';

import { type LinkButtonSize, type LinkButtonVariant } from './typings';

export const StyledLinkButton = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'size',
})<{ variant?: LinkButtonVariant; size?: LinkButtonSize }>(
  ({ theme, variant = 'blue', size = 'large' }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    borderRadius: '50px',
    border: '1px solid transparent',
    textDecoration: 'none',
    fontWeight: 500,
    cursor: 'pointer',
    transition:
      'color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out',

    '&:focus-visible': {
      outline: `2px solid ${theme.palette.secondary.main}`,
      outlineOffset: '3px',
    },

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

    ...(variant === 'blue' && {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,

      '&:hover': {
        backgroundColor: theme.palette.primary.dark,
      },
    }),

    ...(variant === 'yellow' && {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,

      '&:hover': {
        backgroundColor: 'var(--yellow)',
      },
    }),

    ...(variant === 'outlineLight' && {
      backgroundColor: 'transparent',
      borderColor: 'rgba(250, 250, 250, 0.35)',
      color: theme.palette.primary.contrastText,

      '&:hover': {
        borderColor: theme.palette.primary.contrastText,
        backgroundColor: 'rgba(250, 250, 250, 0.08)',
      },
    }),
  }),
);
