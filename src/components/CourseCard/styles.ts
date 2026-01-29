import { Box, styled } from '@mui/material';
import Image from 'next/image';

export const CardContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  minHeight: theme.spacing(20),
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(3),
  borderRadius: '1rem',
  backgroundColor: theme.palette.background.default,
  boxShadow: '0px 4px 13px 0px rgba(0, 0, 0, 0.15)',
  border: '1px solid',
  borderColor: 'transparent',
  cursor: 'pointer',
  transition: 'border-color 0.2s ease-in-out',

  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
}));

export const ContentWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: theme.spacing(1.5),
}));

export const LeftContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '100%',
  maxWidth: '70%',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: theme.spacing(1.75),
}));

export const TopSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),

  '& .course-card-title': {
    color: theme.palette.common.black,
    fontWeight: 600,
    fontSize: '20px',
  },
}));

export const BottomSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

export const ButtonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-end',
  gap: theme.spacing(1.5),
}));

export const StyledImage = styled(Image)(() => ({
  display: 'block',
}));
