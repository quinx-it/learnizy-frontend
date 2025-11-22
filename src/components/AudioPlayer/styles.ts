import { Box, styled } from '@mui/material';

export const Container = Box;

export const PlayerContainer = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.primary.main}`,
  display: 'flex',
  height: '24px',
  width: '100%',
  maxWidth: '250px',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '0.5rem',
  borderRadius: '9999px',
  padding: '0.25rem',
  paddingLeft: '1.25rem',
  paddingRight: '1.25rem',

  [theme.breakpoints.up('md')]: {
    maxWidth: '400px',
  },
}));

export const TimeText = styled('span')(({ theme }) => ({
  width: 'fit-content',
  fontSize: '16px',
  color: theme.palette.common.white,
}));

export const WaveformContainer = styled(Box)(() => ({
  height: '20px',
  flex: 1,
}));

export const ControlsContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

export const PlayButton = styled('button')(() => ({
  marginRight: '0.375rem',
  width: '1.5rem',
  backgroundColor: 'transparent',
  border: 'none',
  padding: 0,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    opacity: 0.8,
  },
}));

export const TranscriptButton = styled('button')(({ theme }) => ({
  borderRadius: '0.25rem',
  paddingTop: '0.25rem',
  paddingBottom: '0.25rem',
  fontSize: '0.875rem',
  color: theme.palette.common.white,
  backgroundColor: 'transparent',
  border: 'none',
  paddingLeft: '0.5rem',
  paddingRight: '0.5rem',
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.8,
  },
}));

export const TranscriptContainer = styled(Box)<{ $maxHeight?: number }>(({ $maxHeight = 0 }) => ({
  overflow: 'hidden',
  paddingLeft: '1.25rem',
  paddingRight: '1.25rem',
  transition: 'max-height 0.5s ease-in-out',
  maxHeight: `${$maxHeight}px`,
}));

export const TranscriptText = styled(Box)(({ theme }) => ({
  marginTop: '0.75rem',
  '& > *': {
    fontSize: '1rem !important',
    color: `${theme.palette.common.white} !important`,
  },
}));
