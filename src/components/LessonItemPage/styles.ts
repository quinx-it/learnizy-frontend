import { Box, Button as MuiButton, styled } from '@mui/material';

import { Heading as BaseHeading, Text as BaseText } from '@/components/Typography';

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
}));

export const BreadcrumbsWrapper = styled(Box)(() => ({
  marginBottom: 0,
}));

export const EditButtonWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

export const EditingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

export const EditorWrapper = styled(Box)(() => ({
  '&.wmde-markdown-light': {
    '& .w-md-editor': {
      borderRadius: '0.5rem',
    },
  },
}));

export const ButtonsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: theme.spacing(0.5),
}));

export const MarkdownWrapper = styled(Box)(() => ({
  maxWidth: '100%',
  wordBreak: 'break-word',
}));

export const LessonMarkdownContent = styled(Box)(() => ({
  maxWidth: '100%',
  wordBreak: 'break-word',

  '& img': {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '100%',
    height: 'auto',
  },
}));

export const SectionHeading = styled(BaseHeading)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

export const SectionText = styled(BaseText)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
}));

export const SectionTextSmall = styled(BaseText)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

export const ButtonsRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(0.5),
}));

export const TestInfoDotTitleWrapper = styled(Box)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1.5),
}));

export const TestFormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
}));

export const TestQuestionRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  padding: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
}));

export const TestQuestionRowHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: theme.spacing(1),
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

export const BlueButtonMedium = styled(MuiButton)(({ theme }) => ({
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
  position: 'relative',
  overflow: 'hidden',

  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: 'none',
    color: theme.palette.common.white,
  },
}));
