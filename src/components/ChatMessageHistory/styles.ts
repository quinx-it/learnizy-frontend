import { Box, Link, styled, Typography } from '@mui/material';

export const ScrollContainer = styled(Box)(({ theme }) => ({
  height: '100%',
  width: '100%',
  maxWidth: '659px',
  overflowY: 'auto',
  paddingTop: theme.spacing(3),
  paddingBottom: theme.spacing(3),
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));

export const LoadingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.main,
}));

export const MessageWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isUser',
})<{ isUser: boolean }>(({ isUser }) => ({
  display: 'flex',
  marginTop: isUser ? '2rem' : '0.75rem',
  justifyContent: isUser ? 'flex-end' : 'flex-start',

  '&:first-of-type': {
    marginTop: 0,
  },
}));

export const MessageBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isUser',
})<{ isUser: boolean }>(({ theme, isUser }) => ({
  boxSizing: 'border-box',
  borderRadius: '1.5rem',
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  wordBreak: 'break-word',
  ...(isUser
    ? {
        marginLeft: '1.5rem',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
      }
    : {
        width: '100%',
        paddingLeft: '1rem',
        paddingRight: '1rem',
        lineHeight: 1.6,
      }),

  [theme.breakpoints.up('lg')]: {
    marginLeft: 0,
    marginRight: 0,
  },
}));

export const UserMessageText = styled(Typography)(() => ({
  paddingLeft: '1rem',
  paddingRight: '1rem',
  fontSize: '1rem',
}));

export const MarkdownWrapper = styled(Box)(() => ({
  wordBreak: 'break-word',

  '& > * + *': {
    marginTop: '0.75rem',
  },

  '& ul, & ol': {
    paddingLeft: '1.25rem',
  },

  '& li + li': {
    marginTop: '0.375rem',
  },
}));

export const AttachmentsWrapper = styled(Box)(() => ({
  marginTop: '0.5rem',
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
}));

export const AttachmentLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  borderRadius: '50px',
  paddingLeft: '1.25rem',
  paddingRight: '1.25rem',
  paddingTop: '0.25rem',
  paddingBottom: '0.25rem',
  fontSize: '0.875rem',
  transition: 'color 0.2s ease-in-out',
  textDecoration: 'none',
  color: 'inherit',

  '&:hover': {
    color: theme.palette.grey[300],
  },
}));

export const AttachmentFilename = styled(Typography)(() => ({
  maxWidth: '150px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

export const ThinkingWrapper = styled(Box)(() => ({
  marginTop: '0.75rem',
  display: 'flex',
  justifyContent: 'flex-start',
}));

export const ThinkingBubble = styled(Box)(({ theme }) => ({
  display: 'flex',
  maxWidth: '90%',
  alignItems: 'center',
  gap: '0.5rem',
  borderRadius: '1.5rem',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  color: theme.palette.grey[700],
}));

export const ThinkingText = styled(Typography)(() => ({}));
