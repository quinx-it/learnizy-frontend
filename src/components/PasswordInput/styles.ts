import { Box, IconButton, styled } from '@mui/material';

import { EyeIcon as BaseEyeIcon } from '@/components/Icons';

import { StyledInput as BaseStyledInput } from '@/components/Input/styles';

export const PasswordInputWrapper = styled(Box)(() => ({
  position: 'relative',
}));

export const InputWrapper = styled(Box)(() => ({
  position: 'relative',
}));

export const StyledInput = styled(BaseStyledInput)(({ theme }) => ({
  paddingRight: theme.spacing(5),

  '&::-ms-reveal': {
    visibility: 'hidden',
    pointerEvents: 'none',
    display: 'none',
  },

  '&::-ms-clear': {
    visibility: 'hidden',
    pointerEvents: 'none',
    display: 'none',
  },
}));

export const ToggleButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(1.25),
  top: '50%',
  transform: 'translateY(-50%)',
  padding: theme.spacing(0.5),
  zIndex: 1,
  color: theme.palette.text.primary,

  '&:hover': {
    backgroundColor: 'transparent',
    opacity: 0.7,
  },

  '&:disabled': {
    opacity: 0.5,
  },
}));

export const StyledEyeIcon = styled(BaseEyeIcon)(() => ({
  width: '16px',
  height: '16px',
}));

export const ScreenReaderOnly = styled('span')(() => ({
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
