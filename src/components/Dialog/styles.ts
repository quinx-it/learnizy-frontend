import { Box, styled } from '@mui/material';
import * as DialogPrimitive from '@radix-ui/react-dialog';

export const StyledOverlay = styled(DialogPrimitive.Overlay)(() => ({
  position: 'fixed',
  inset: 0,
  zIndex: 50,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  '&[data-state=open]': {
    animation: 'fadeIn 0.15s ease-out',
  },
  '&[data-state=closed]': {
    animation: 'fadeOut 0.15s ease-out',
  },
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },
  '@keyframes fadeOut': {
    from: {
      opacity: 1,
    },
    to: {
      opacity: 0,
    },
  },
}));

export const StyledContent = styled(DialogPrimitive.Content)(({ theme }) => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  zIndex: 50,
  display: 'grid',
  width: '100%',
  maxWidth: 'calc(100% - 2rem)',
  transform: 'translate(-50%, -50%)',
  gap: '1rem',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  padding: '1.5rem',
  boxShadow: theme.shadows[8],
  transition: 'all 0.2s',
  '&[data-state=open]': {
    animation: 'fadeInZoomIn 0.2s ease-out',
  },
  '&[data-state=closed]': {
    animation: 'fadeOutZoomOut 0.2s ease-out',
  },
  '@keyframes fadeInZoomIn': {
    from: {
      opacity: 0,
      transform: 'translate(-50%, -50%) scale(0.95)',
    },
    to: {
      opacity: 1,
      transform: 'translate(-50%, -50%) scale(1)',
    },
  },
  '@keyframes fadeOutZoomOut': {
    from: {
      opacity: 1,
      transform: 'translate(-50%, -50%) scale(1)',
    },
    to: {
      opacity: 0,
      transform: 'translate(-50%, -50%) scale(0.95)',
    },
  },
  [theme.breakpoints.up('sm')]: {
    maxWidth: '32rem',
  },
}));

export const CloseButton = styled(DialogPrimitive.Close)(({ theme }) => ({
  position: 'absolute',
  top: '1rem',
  right: '1rem',
  borderRadius: '2px',
  opacity: 0.7,
  transition: 'opacity 0.2s',
  border: 'none',
  background: 'transparent',
  cursor: 'pointer',
  padding: '0.25rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '&:hover': {
    opacity: 1,
  },

  '&:focus': {
    outline: 'none',
    boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
  },

  '&[data-state=open]': {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.text.secondary,
  },

  '&:disabled': {
    pointerEvents: 'none',
  },

  '& svg': {
    pointerEvents: 'none',
    flexShrink: 0,
    height: '1rem',
    width: '1rem',
  },
}));

export const DialogHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  textAlign: 'center',
  [theme.breakpoints.up('sm')]: {
    textAlign: 'left',
  },
}));

export const DialogFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column-reverse',
  gap: '0.5rem',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
}));

export const DialogTitle = styled(DialogPrimitive.Title)(({ theme }) => ({
  fontSize: '1.125rem',
  lineHeight: '1',
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

export const DialogDescription = styled(DialogPrimitive.Description)(({ theme }) => ({
  fontSize: '0.875rem',
  color: theme.palette.text.secondary,
}));

export const ScreenReaderOnly = styled(Box)(() => ({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: 0,
}));
