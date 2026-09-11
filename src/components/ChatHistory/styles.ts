import { Box, Typography, styled } from '@mui/material';

import Button from '@/components/Button';

export const MobileButtonWrapper = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: 'calc(96px + env(safe-area-inset-bottom))',
  insetInlineEnd: theme.spacing(9),
  zIndex: 40,

  [theme.breakpoints.up('md')]: {
    insetInlineEnd: theme.spacing(2),
  },

  [theme.breakpoints.up('lg')]: {
    display: 'none',
  },
}));

export const Overlay = styled(Box)(() => ({
  position: 'fixed',
  inset: 0,
  zIndex: 40,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  transition: 'opacity 0.3s',
}));

export const MobileSidebar = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOpen',
})<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 50,
  display: 'flex',
  height: '100%',
  width: '80%',
  maxWidth: '280px',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
  borderRadius: '1.5rem 0 0 1.5rem',
  padding: '1rem',
  boxShadow: '0px 4px 13px 0px rgba(0, 0, 0, 0.149)',
  transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
  transition: 'transform 0.3s',

  [theme.breakpoints.up('lg')]: {
    display: 'none',
  },
}));

export const MobileSidebarHeader = styled(Box)(() => ({
  position: 'relative',
  marginTop: '0.5rem',
  marginBottom: '2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '0.75rem',
}));

export const MobileOpenButton = styled(Button)(({ theme }) => ({
  borderRadius: '50%',
  border: `1px solid ${theme.palette.divider}`,
  minWidth: 0,
  width: '40px',
  height: '40px',
  padding: 0,
}));

export const CloseButton = styled(Button)(({ theme }) => ({
  height: '32px',
  width: '32px',
  cursor: 'pointer',
  borderRadius: '50%',
  border: 'none',
  padding: 0,
  color: theme.palette.primary.main,
}));

export const NewChatButton = styled(Button)(() => ({
  width: '100%',
  justifyContent: 'flex-start',
  gap: '0.5rem',
  border: 0,
  paddingLeft: '1.25rem',
  paddingRight: '1.25rem',
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
}));

export const DesktopNewChatButton = styled(NewChatButton)(() => ({}));

export const HeaderTitle = styled(Typography)(() => ({
  minWidth: 0,
  fontSize: '18px',
  fontWeight: 600,
  wordBreak: 'break-word',
  textAlign: 'left',
  flex: 1,
}));

export const NewChatButtonWrapper = styled(Box)(() => ({
  marginBottom: '1rem',
}));

export const ScrollContainer = styled(Box)(() => ({
  flex: 1,
  minHeight: 0,
  paddingBottom: '0.75rem',
  overflowY: 'auto',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',

  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));

export const GroupLabel = styled(Typography)(({ theme }) => ({
  display: 'block',
  marginBottom: '0.25rem',
  paddingLeft: '0.75rem',
  textAlign: 'left',
  fontSize: '12px',
  letterSpacing: '0.5px',
  color: theme.palette.grey[400],
}));

export const ChatItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected: boolean }>(({ theme, isSelected }) => ({
  display: 'flex',
  minWidth: 0,
  minHeight: '40px',
  cursor: 'pointer',
  alignItems: 'center',
  borderRadius: '0.75rem',
  paddingLeft: '0.75rem',
  paddingRight: '0.75rem',
  transition: 'background-color 0.2s',
  backgroundColor: isSelected ? theme.palette.grey[200] : 'transparent',

  '&:hover': {
    backgroundColor: isSelected ? theme.palette.grey[200] : theme.palette.grey[100],
  },
}));

export const ChatText = styled(Typography)(() => ({
  minWidth: 0,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  fontSize: '0.875rem',
  lineHeight: '1.25rem',
}));

export const DesktopWrapper = styled(Box)(({ theme }) => ({
  display: 'none',
  backgroundColor: 'transparent',

  [theme.breakpoints.up('lg')]: {
    display: 'block',
    width: '260px',
  },
}));

export const DesktopSidebar = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  right: 0,
  zIndex: 50,
  display: 'flex',
  height: '100dvh',
  width: '260px',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
  borderRadius: '1.5rem 0 0 1.5rem',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  overflowY: 'hidden',
  boxShadow: '0px 4px 13px 0px rgba(0, 0, 0, 0.149)',
}));

export const DesktopSidebarHeader = styled(Box)(() => ({
  marginTop: '1.5rem',
  marginBottom: '1rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
}));

export const DesktopHeaderTitle = styled(Typography)(() => ({
  display: 'block',
  minWidth: 0,
  textAlign: 'left',
  fontSize: '18px',
  fontWeight: 600,
  wordBreak: 'break-word',
}));

export const DesktopNewChatButtonWrapper = styled(Box)(({ theme }) => ({
  marginBottom: '0.75rem',
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  paddingBottom: '0.75rem',
}));

export const LoadingText = styled(Typography)(({ theme }) => ({
  padding: '0.75rem',
  fontSize: '0.875rem',
  color: theme.palette.grey[500],
}));

export const ErrorText = styled(Typography)(({ theme }) => ({
  padding: '0.75rem',
  fontSize: '0.875rem',
  color: theme.palette.error.main,
}));

export const ChatGroup = styled(Box)(() => ({
  marginTop: '1rem',

  '&:first-of-type': {
    marginTop: 0,
  },
}));

export const EmptyText = styled(Typography)(({ theme }) => ({
  padding: '0.75rem',
  fontSize: '0.875rem',
  color: theme.palette.grey[500],
}));
