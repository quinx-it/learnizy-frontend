import { Box, Button, styled } from '@mui/material';

export const Container = styled(Box)(() => ({
  position: 'relative',
  display: 'flex',
  width: '100%',
  justifyContent: 'flex-end',
  paddingRight: '1rem',
}));

export const ToggleButton = styled(Button)(({ theme }) => ({
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
  transition: 'background-color 0.2s ease-in-out',

  '&:hover': {
    backgroundColor: theme.palette.grey[100],
    boxShadow: 'none',
  },
}));

export const DropdownMenu = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOpen',
})<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  position: 'absolute',
  top: '100%',
  right: '1rem',
  zIndex: 50,
  marginTop: '0.5rem',
  width: '7rem',
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
