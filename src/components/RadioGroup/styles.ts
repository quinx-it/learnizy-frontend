import { styled } from '@mui/material';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

export const StyledRadioGroupRoot = styled(RadioGroupPrimitive.Root)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.75),
}));

export const StyledRadioGroupItem = styled(RadioGroupPrimitive.Item)(({ theme }) => ({
  aspectRatio: '1 / 1',
  width: '16px',
  height: '16px',
  flexShrink: 0,
  borderRadius: '50%',
  border: `1px solid ${theme.palette.grey[400]}`,
  color: theme.palette.text.primary,
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  transition: 'color 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  outline: 'none',
  cursor: 'pointer',

  '&:focus-visible': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 3px ${theme.palette.primary.main}80`,
  },

  '&:disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },

  '&[aria-invalid="true"]': {
    borderColor: theme.palette.error.main,
    boxShadow: `0 0 0 3px ${theme.palette.error.main}33`,
  },
}));

export const StyledRadioGroupIndicator = styled(RadioGroupPrimitive.Indicator)(({ theme }) => ({
  color: theme.palette.primary.main,
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
}));

export const StyledCircleIconWrapper = styled('div')(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '8px',
  height: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
