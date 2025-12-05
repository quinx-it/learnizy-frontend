import { styled } from '@mui/material';
import * as SelectPrimitive from '@radix-ui/react-select';

export const StyledTrigger = styled(SelectPrimitive.Trigger)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(4),
  borderRadius: '32px',
  border: `1px solid ${theme.palette.info.main}`,
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  fontSize: '20px',
  lineHeight: '27px',
  boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  outline: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  transition: 'border-color 0.2s ease-in-out',

  '&:focus': {
    outline: 'none',
    borderColor: theme.palette.primary.main,
  },

  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
}));

export const StyledValue = styled(SelectPrimitive.Value)(() => ({}));

export const StyledIcon = styled(SelectPrimitive.Icon)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'inherit',
}));

export const StyledContent = styled(SelectPrimitive.Content)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  zIndex: 50,
  margin: 0,
  marginTop: theme.spacing(3.25),
  overflow: 'hidden',
  borderRadius: '24px',
  border: `1px solid ${theme.palette.info.main}`,
  padding: theme.spacing(1),
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
}));

export const StyledScrollUpButton = styled(SelectPrimitive.ScrollUpButton)(() => ({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '4px',
  paddingBottom: '4px',
}));

export const StyledViewport = styled(SelectPrimitive.Viewport)(({ theme }) => ({
  padding: theme.spacing(0.25),
}));

export const StyledGroup = styled(SelectPrimitive.Group)(() => ({}));

export const StyledLabel = styled(SelectPrimitive.Label)(({ theme }) => ({
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  paddingTop: '6px',
  paddingBottom: '6px',
  fontSize: '12px',
  color: theme.palette.text.primary,
}));

export const StyledItem = styled(SelectPrimitive.Item)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  cursor: 'default',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  borderRadius: '24px',
  paddingLeft: theme.spacing(1),
  paddingRight: theme.spacing(1),
  paddingTop: '6px',
  paddingBottom: '6px',
  fontSize: '14px',
  userSelect: 'none',
  outline: 'none',
  transition: 'background-color 0.2s ease-in-out, color 0.2s ease-in-out',

  '&:focus': {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.text.primary,
  },

  '&[data-disabled]': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
}));

export const StyledItemText = styled(SelectPrimitive.ItemText)(() => ({}));

export const StyledItemIndicator = styled(SelectPrimitive.ItemIndicator)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const StyledScrollDownButton = styled(SelectPrimitive.ScrollDownButton)(() => ({
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '4px',
  paddingBottom: '4px',
}));
