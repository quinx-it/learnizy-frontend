import { Box, Button, styled } from '@mui/material';

export const Container = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'fullWidth',
})<{ fullWidth?: boolean }>(({ fullWidth }) => ({
  position: 'relative',
  display: 'flex',
  width: '100%',
  minWidth: 0,
  justifyContent: fullWidth ? 'stretch' : 'flex-end',
  paddingRight: fullWidth ? 0 : '1rem',
}));

export const ToggleButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'fullWidth',
})<{ fullWidth?: boolean }>(({ theme, fullWidth }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  borderRadius: '0.375rem',
  border: `1px solid ${theme.palette.grey[300]}`,
  paddingLeft: '0.75rem',
  paddingRight: '0.75rem',
  paddingTop: '0.25rem',
  paddingBottom: '0.25rem',
  fontSize: '0.875rem',
  backgroundColor: 'transparent',
  textTransform: 'none',
  boxShadow: 'none',
  transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',

  '&:hover': {
    backgroundColor: theme.palette.grey[100],
    boxShadow: 'none',
  },

  ...(fullWidth && {
    width: '100%',
    minWidth: 0,
    minHeight: '44px',
    justifyContent: 'flex-start',
    gap: theme.spacing(0.625),
    border: 'none',
    borderRadius: '50px',
    paddingLeft: theme.spacing(1.5),
    paddingRight: theme.spacing(1.5),
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
    fontSize: '14px',
    fontWeight: 500,
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,

    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      boxShadow: 'none',
    },

    [theme.breakpoints.up('md')]: {
      justifyContent: 'center',
    },

    [theme.breakpoints.up('lg')]: {
      justifyContent: 'flex-start',
    },
  }),
}));

export const IconWrapper = styled(Box)(() => ({
  display: 'flex',
  width: '16px',
  height: '16px',
  flexShrink: 0,
  alignItems: 'center',
  justifyContent: 'center',
}));

export const LabelText = styled(Box)(({ theme }) => ({
  display: 'block',
  fontSize: '14px',
  lineHeight: '22px',
  fontWeight: 500,

  [theme.breakpoints.up('md')]: {
    display: 'none',
  },

  [theme.breakpoints.up('lg')]: {
    display: 'block',
  },
}));

export const DropdownMenu = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOpen' && prop !== 'fullWidth',
})<{ isOpen: boolean; fullWidth?: boolean }>(({ theme, isOpen, fullWidth }) => ({
  position: 'absolute',
  top: '100%',
  right: fullWidth ? 0 : '1rem',
  left: fullWidth ? 0 : 'auto',
  zIndex: 50,
  marginTop: '0.5rem',
  width: fullWidth ? 'auto' : '7rem',
  minWidth: '7rem',
  borderRadius: '0.375rem',
  border: `1px solid ${theme.palette.grey[200]}`,
  backgroundColor: theme.palette.background.paper,
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  transition: 'all 0.2s ease-in-out',
  pointerEvents: isOpen ? 'auto' : 'none',
  transform: isOpen ? 'translateY(0)' : 'translateY(-0.5rem)',
  opacity: isOpen ? 1 : 0,
}));

export const MenuItem = styled(Button)(({ theme }) => ({
  display: 'block',
  width: '100%',
  paddingLeft: '0.75rem',
  paddingRight: '0.75rem',
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  textAlign: 'left',
  fontSize: '0.875rem',
  backgroundColor: 'transparent',
  textTransform: 'none',
  boxShadow: 'none',
  transition: 'background-color 0.2s ease-in-out',

  '&:hover': {
    backgroundColor: theme.palette.grey[100],
    boxShadow: 'none',
  },
}));
