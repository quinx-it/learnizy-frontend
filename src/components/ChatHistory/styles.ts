import { Box, Typography, styled } from '@mui/material';
import { shouldForwardProp } from '@mui/system';

import Button from '@/components/Button';

export const MobileButtonWrapper = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: '1rem',
  right: 0,
  zIndex: 40,
  marginLeft: '1.5rem',
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
  shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isOpen',
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

export const MobileOpenButton = styled(Button)(() => ({
  borderRadius: '50%',
  border: '1px solid',
  padding: '0.5rem',
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

export const DesktopNewChatButton = styled(NewChatButton)(() => ({
  marginTop: 'auto',
}));

export const HeaderTitle = styled(Typography)(() => ({
  fontSize: '20px',
  wordBreak: 'break-word',
}));

export const NewChatButtonWrapper = styled(Box)(() => ({
  marginBottom: '1rem',
}));

export const ChatsLabel = styled(Typography)(({ theme }) => ({
  marginBottom: '1rem',
  display: 'block',
  textAlign: 'left',
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '0.5px',
  color: theme.palette.primary.main,
}));

export const ScrollContainer = styled(Box)(() => ({
  flex: 1,
  overflowY: 'auto',
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));

export const GroupLabel = styled(Typography)(({ theme }) => ({
  display: 'block',
  textAlign: 'left',
  fontSize: '12px',
  letterSpacing: '0.5px',
  color: theme.palette.grey[400],
}));

export const ChatItem = styled(Box, {
  shouldForwardProp: (prop) => shouldForwardProp(prop) && prop !== 'isSelected',
})<{ isSelected: boolean }>(({ theme, isSelected }) => ({
  marginTop: '0.5rem',
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  borderRadius: '1rem',
  padding: '0.5rem',
  transition: 'background-color 0.2s',
  backgroundColor: isSelected ? theme.palette.grey[200] : 'transparent',
  '&:hover': {
    backgroundColor: isSelected ? theme.palette.grey[200] : theme.palette.grey[100],
  },
  '&:last-child': {
    marginBottom: '0.625rem',
  },
}));

export const ChatText = styled(Typography)(() => ({
  marginLeft: '0.5rem',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
}));

export const DesktopWrapper = styled(Box)(({ theme }) => ({
  display: 'none',
  backgroundColor: 'transparent',
  [theme.breakpoints.up('lg')]: {
    display: 'block',
    width: '230px',
  },
}));

export const DesktopSidebar = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  right: 0,
  zIndex: 50,
  display: 'flex',
  height: '100vh',
  width: '230px',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
  borderRadius: '1.5rem 0 0 1.5rem',
  paddingLeft: '1.5rem',
  paddingRight: '1.5rem',
  overflowY: 'auto',
  boxShadow: '0px 4px 13px 0px rgba(0, 0, 0, 0.149)',
}));

export const DesktopSidebarHeader = styled(Box)(() => ({
  marginTop: '2rem',
  marginBottom: '3.8125rem',
  display: 'flex',
  justifyContent: 'flex-end',
}));

export const DesktopHeaderTitle = styled(Typography)(() => ({
  display: 'block',
  height: '48px',
  textAlign: 'right',
  fontSize: '20px',
  wordBreak: 'break-word',
}));

export const DesktopNewChatButtonWrapper = styled(Box)(({ theme }) => ({
  marginBottom: '1rem',
  borderBottom: `1px solid ${theme.palette.grey[200]}`,
  paddingBottom: '0.5rem',
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
