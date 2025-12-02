import { Box, styled } from '@mui/material';
import Image from 'next/image';

export const CardContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'bonus' && prop !== 'isBlocked' && prop !== 'isMentor',
})<{ bonus?: boolean; isBlocked?: boolean; isMentor?: boolean }>(
  ({ theme, bonus, isBlocked, isMentor }) => ({
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
    cursor: isBlocked && !isMentor ? 'default' : 'pointer',
    ...(bonus && {
      backgroundColor: `${theme.palette.info.main}80`,
      borderColor: theme.palette.info.main,
    }),
    ...((!isBlocked || isMentor) && {
      '&:hover': {
        borderColor: theme.palette.primary.main,
      },
    }),
  }),
);

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

  '& .module-card-title-first': {
    color: theme.palette.common.black,
  },

  '& .module-card-title-second': {
    color: theme.palette.primary.main,
  },

  '& .module-card-title-second *': {
    color: theme.palette.primary.main,
  },

  '& span.module-card-title-second > div': {
    backgroundColor: theme.palette.primary.main,
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

export const ProgressContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(0.375),
  alignSelf: 'center',
  color: theme.palette.text.secondary,
}));

export const StarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(0.375),
  color: theme.palette.text.secondary,
  '& svg': {
    width: '18px',
    height: '18px',
  },
}));

export const DotTitleWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'bonus',
})<{ bonus?: boolean }>(({ theme, bonus }) => ({
  color: bonus ? theme.palette.primary.main : theme.palette.text.secondary,
  '& span > div': {
    color: theme.palette.text.secondary,
  },
}));
