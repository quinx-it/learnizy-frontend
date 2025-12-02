import { Box, styled } from '@mui/material';
import Image from 'next/image';

import Button from '@/components/Button';
import { Text as BaseText } from '@/components/Typography';

import { Container } from '@/components/CardWrapper/styles';

export const StyledCardWrapper = styled(Container)(() => ({
  height: '100%',
  maxWidth: '100%',
}));

export const ProfileContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  width: '100%',
}));

export const AvatarContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  margin: `0 auto ${theme.spacing(1.5)}`,
  height: '152px',
  width: '152px',
  overflow: 'visible',
  borderRadius: '50%',
}));

export const StyledImage = styled(Image)(() => ({
  borderRadius: '50%',
}));

export const EditButton = styled('button')(() => ({
  position: 'absolute',
  right: 0,
  bottom: 0,
  transform: 'translateX(-90%)',
  cursor: 'pointer',
  background: 'none',
  border: 'none',
  padding: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const NameText = styled(BaseText)(() => ({
  textAlign: 'center',
}));

export const LinksContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const LogoutButton = styled(Button)(({ theme }) => ({
  justifyContent: 'flex-start',
  border: 0,
  fontSize: '16px',
  backgroundColor: 'transparent',

  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: `${theme.palette.common.white} !important`,
    boxShadow: 'none',
    '& *': {
      color: `${theme.palette.common.white} !important`,
    },
  },
}));

export const ExitIconWrapper = styled(Box)(({ theme }) => ({
  marginRight: theme.spacing(0.625),
  height: '20px',
  width: '20px',
  color: theme.palette.text.primary,
  transition: 'color 0.2s ease-in-out',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
