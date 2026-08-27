import { Box, styled } from '@mui/material';

import Link from '@/components/Link';

export const HeaderBand = styled('header')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  backgroundColor: 'transparent',
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2.5),
  paddingTop: theme.spacing(2.5),
  paddingBottom: theme.spacing(2.5),

  [theme.breakpoints.up('md')]: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },

  [theme.breakpoints.up('xl')]: {
    paddingLeft: '150px',
    paddingRight: '150px',
  },
}));

export const HeaderInner = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  gap: theme.spacing(2),
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '1140px',
}));

export const SignInLink = styled(Link)(({ theme }) => ({
  display: 'none',
  fontSize: '16px',
  lineHeight: '22px',
  fontWeight: 500,
  textDecoration: 'none',
  color: 'rgba(250, 250, 250, 0.78)',
  transition: 'color 0.2s ease-in-out',

  '&:hover': {
    color: theme.palette.common.white,
  },

  '&:focus-visible': {
    outline: `2px solid ${theme.palette.secondary.main}`,
    outlineOffset: '4px',
    borderRadius: '4px',
  },

  [theme.breakpoints.up('sm')]: {
    display: 'inline-flex',
  },
}));

// LanguageSwitcher ships light-on-white for the app header; recolour it for the
// dark band. Selectors are exact — a blanket `& button` also hits the menu items.
// DOM: slot > container > [ toggle button, menu > item buttons ]
export const SwitcherSlot = styled(Box)(({ theme }) => ({
  '& > div': {
    width: 'auto',
    paddingRight: 0,
  },

  '& > div > button': {
    color: 'rgba(250, 250, 250, 0.78)',
    borderColor: 'rgba(250, 250, 250, 0.28)',

    '&:hover': {
      color: theme.palette.common.white,
      backgroundColor: 'rgba(250, 250, 250, 0.08)',
    },
  },

  '& > div > div': {
    right: 0,
    backgroundColor: theme.palette.grey[900],
    borderColor: 'rgba(169, 219, 233, 0.22)',
  },

  '& > div > div > button': {
    color: 'rgba(250, 250, 250, 0.78)',

    '&:hover': {
      color: theme.palette.common.white,
      backgroundColor: 'rgba(250, 250, 250, 0.1)',
    },
  },
}));
