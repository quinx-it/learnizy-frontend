import { Box, Button, styled } from '@mui/material';

import { StyledInput } from '@/components/Input/styles';
import { StyledTextarea as BaseTextarea } from '@/components/Textarea/styles';

export const Container = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isExpanded',
})<{ isExpanded: boolean }>(({ theme, isExpanded }) => ({
  position: 'relative',
  display: 'flex',
  width: '100%',
  maxWidth: '666px',
  border: `1px solid ${theme.palette.grey[300]}`,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(0.75),
  boxShadow: '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)',
  ...(isExpanded
    ? {
        height: 'auto',
        alignItems: 'flex-end',
        borderRadius: '1.5rem',
      }
    : {
        minHeight: '48px',
        alignItems: 'center',
        borderRadius: '24px',
      }),
}));

export const AttachedFilesContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(0.5),
  left: theme.spacing(0.75),
  zIndex: 10,
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(0.5),
}));

export const AttachedFileItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  borderRadius: '50px',
  backgroundColor: 'rgba(169, 219, 233, 0.2)',
  paddingTop: theme.spacing(0.25),
  paddingBottom: theme.spacing(0.25),
  paddingRight: theme.spacing(0.5),
  paddingLeft: theme.spacing(0.75),
  fontSize: '0.875rem',
  color: theme.palette.primary.main,
}));

export const AttachedFileName = styled(Box)(() => ({
  maxWidth: '150px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

export const RemoveFileButton = styled(Button)(({ theme }) => ({
  display: 'flex',
  height: '1.25rem',
  width: '1.25rem',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  minWidth: 'auto',
  padding: 0,
  textTransform: 'none',
  boxShadow: 'none',

  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
}));

export const AttachButton = styled(Button)(({ theme }) => ({
  cursor: 'pointer',
  padding: theme.spacing(0.5),
  color: theme.palette.grey[400],
  transition: 'color 0.2s',
  minWidth: 'auto',
  textTransform: 'none',
  boxShadow: 'none',

  '&:hover': {
    color: theme.palette.grey[500],
    backgroundColor: 'transparent',
  },
}));

export const StyledTextarea = styled(BaseTextarea, {
  shouldForwardProp: (prop) => prop !== 'hasAttachedFiles' && prop !== 'isRecording',
})<{ hasAttachedFiles: boolean; isRecording: boolean }>(
  ({ theme, hasAttachedFiles, isRecording }) => ({
    flex: 1,
    resize: 'none',
    overflowY: 'auto',
    backgroundColor: 'transparent',
    paddingLeft: theme.spacing(0.75),
    paddingRight: theme.spacing(0.75),
    fontSize: theme.typography.body1.fontSize,
    color: theme.palette.text.primary,
    outline: 'none',
    border: 'none',
    marginTop: hasAttachedFiles ? theme.spacing(2) : 0,
    marginBottom: hasAttachedFiles ? theme.spacing(0.5) : 0,
    fontFamily: 'inherit',
    height: 'auto',

    '&::placeholder': {
      color: isRecording ? theme.palette.error.main : theme.palette.grey[400],
    },

    '&::-webkit-scrollbar': {
      width: '6px',
    },

    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.grey[300],
      borderRadius: '4px',
    },
  }),
);

export const MicrophoneContainer = styled(Box)(() => ({
  position: 'relative',
}));

export const SwipeUpHint = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '-1.5rem',
  left: '50%',
  transform: 'translateX(-50%)',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.25),
  fontSize: '0.75rem',
  color: theme.palette.grey[600],
  animation: 'bounce 1s infinite',

  '@keyframes bounce': {
    '0%, 100%': {
      transform: 'translateX(-50%) translateY(0)',
    },
    '50%': {
      transform: 'translateX(-50%) translateY(-10px)',
    },
  },
}));

export const SwipeUpText = styled(Box)(() => ({}));

export const MicrophoneButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isRecording',
})<{ isRecording: boolean }>(({ theme, isRecording }) => ({
  display: 'flex',
  height: '2.25rem',
  width: '2.25rem',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  color: theme.palette.grey[400],
  transition: 'all 0.3s',
  minWidth: 'auto',
  textTransform: 'none',
  boxShadow: 'none',

  '&:hover': {
    backgroundColor: 'rgba(169, 219, 233, 0.2)',
    color: theme.palette.grey[400],
  },
  ...(isRecording && {
    transform: 'scale(1.1)',
    background: 'linear-gradient(to right, #238ba7, rgba(35, 139, 167, 0.7))',
    color: theme.palette.common.white,
  }),
}));

export const AudioBarsContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.5px',
}));

export const AudioBar = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'barHeight',
})<{ barHeight?: number }>(({ theme, barHeight }) => ({
  width: '1.5px',
  borderRadius: '2px',
  backgroundColor: theme.palette.common.white,
  transition: 'height 0.1s ease-out',
  height: barHeight ? `${barHeight}px` : '4px',
}));

export const StopButton = styled(Button)(({ theme }) => ({
  marginLeft: '0.125rem',
  borderRadius: '50%',
  minWidth: '36px',
  width: '36px',
  height: '36px',
  padding: 0,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  textTransform: 'none',
  boxShadow: 'none',

  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: 'none',
  },

  '&:disabled': {
    backgroundColor: theme.palette.info.main,
  },
}));

export const StopButtonContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.25),
}));

export const StopButtonBar = styled(Box)(() => ({
  height: '1rem',
  width: '0.25rem',
  borderRadius: '2px',
  backgroundColor: 'currentColor',
}));

export const DiscardButton = styled(Button)(({ theme }) => ({
  marginLeft: '0.125rem',
  borderRadius: '50%',
  minWidth: '36px',
  width: '36px',
  height: '36px',
  padding: 0,
  backgroundColor: theme.palette.info.main,
  color: theme.palette.common.white,
  textTransform: 'none',
  boxShadow: 'none',

  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    boxShadow: 'none',
  },
}));

export const SendButton = styled(Button)(({ theme }) => ({
  marginLeft: '0.125rem',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  padding: theme.spacing(0.5),
  color: theme.palette.grey[500],
  transition: 'background-color 0.2s, color 0.2s',
  textTransform: 'none',
  boxShadow: 'none',
  minWidth: 'auto',

  '&:hover': {
    backgroundColor: 'rgba(169, 219, 233, 0.2)',
    color: theme.palette.grey[500],
    boxShadow: 'none',
  },
}));

export const UploadAudioButton = styled(Button)(({ theme }) => ({
  marginLeft: '0.125rem',
  borderRadius: '50%',
  minWidth: '36px',
  width: '36px',
  height: '36px',
  padding: 0,
  backgroundColor: theme.palette.success.main,
  color: theme.palette.common.white,
  textTransform: 'none',
  boxShadow: 'none',

  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    boxShadow: 'none',
  },
}));

export const HiddenFileInput = styled(StyledInput)(() => ({
  display: 'none',
}));
