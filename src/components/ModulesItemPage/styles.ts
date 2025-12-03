import { Box, Button as MuiButton, styled } from '@mui/material';

import Link from '@/components/Link';
import { Text as BaseText } from '@/components/Typography';

export const CardWrapperContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.25),
}));

export const TitleSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
}));

export const StyledCreateButton = styled(MuiButton)(({ theme }) => ({
  fontSize: '16px',
  textTransform: 'none',
  boxShadow: 'none',
  borderRadius: '50px',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  paddingLeft: theme.spacing(1.25),
  paddingRight: theme.spacing(1.25),
  paddingTop: theme.spacing(0.375),
  paddingBottom: theme.spacing(0.375),

  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: 'none',
  },
}));

export const LessonsList = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(0.75),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.75),
  padding: 0,
  listStyle: 'none',
}));

export const LessonListItem = styled(Box)(() => ({
  position: 'relative',
}));

export const LessonActions = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  display: 'flex',
  gap: theme.spacing(0.5),
}));

export const ExamStatusContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'underline',

  '&:hover': {
    textDecoration: 'underline',
  },
}));

export const ExamActionsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const StyledLinkButton = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  textDecoration: 'none',

  '&:hover': {
    textDecoration: 'none',
  },
}));

export const StyledStartButton = styled(MuiButton)(({ theme }) => ({
  marginRight: theme.spacing(0.5),
  textTransform: 'none',
  boxShadow: 'none',
  borderRadius: '50px',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2.5),
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  fontSize: '16px',
  lineHeight: '22px',

  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: 'none',
  },

  '&:disabled': {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.common.white,
  },
}));

export const ProgressText = styled(BaseText)(({ theme }) => ({
  fontFamily: 'Montserrat',
  color: theme.palette.text.secondary,
  fontWeight: 600,
}));

export const DialogContentWrapper = styled(Box)(({ theme }) => ({
  '& [data-slot="dialog-content"]': {
    [theme.breakpoints.up('sm')]: {
      maxWidth: '28rem',
    },
  },
}));

export const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
}));

export const DialogFooterWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  '& [data-slot="dialog-footer"]': {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(0.5),
  },
}));

export const ModuleTitleWrapper = styled(Box)(({ theme }) => ({
  '& .module-title-first': {
    fontSize: '24px',
    lineHeight: '32px',
    color: theme.palette.common.black,
  },

  '& .module-title-second': {
    color: theme.palette.primary.main,
    fontSize: '24px',
    lineHeight: '32px',
  },

  '& .module-title-second *': {
    color: theme.palette.primary.main,
  },
}));

export const ModuleInfoWrapper = styled(Box)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const YellowButton = styled(MuiButton)(({ theme }) => ({
  textTransform: 'none',
  boxShadow: 'none',
  borderRadius: '50px',
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.common.black,
  paddingLeft: theme.spacing(1.25),
  paddingRight: theme.spacing(1.25),
  paddingTop: theme.spacing(0.375),
  paddingBottom: theme.spacing(0.375),
  fontSize: '12px',
  lineHeight: '16px',
  position: 'relative',
  overflow: 'hidden',

  '&:hover': {
    backgroundColor: theme.palette.warning.main,
    boxShadow: 'none',
  },
}));

export const WhiteButton = styled(MuiButton)(({ theme }) => ({
  textTransform: 'none',
  boxShadow: 'none',
  borderRadius: '50px',
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  border: `1px solid ${theme.palette.primary.main}`,
  paddingLeft: theme.spacing(1.25),
  paddingRight: theme.spacing(1.25),
  paddingTop: theme.spacing(0.375),
  paddingBottom: theme.spacing(0.375),
  fontSize: '12px',
  lineHeight: '16px',
  position: 'relative',
  overflow: 'hidden',

  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    boxShadow: 'none',
  },
}));

export const BlueButtonSmall = styled(MuiButton)(({ theme }) => ({
  textTransform: 'none',
  boxShadow: 'none',
  borderRadius: '50px',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  paddingLeft: theme.spacing(1.25),
  paddingRight: theme.spacing(1.25),
  paddingTop: theme.spacing(0.375),
  paddingBottom: theme.spacing(0.375),
  fontSize: '12px',
  lineHeight: '16px',
  position: 'relative',
  overflow: 'hidden',

  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: 'none',
    color: theme.palette.common.white,
  },
}));
