import { Box, Button, styled } from '@mui/material';

import { ExamStatus } from '@/components/ExamsPage/typings';
import { Text as BaseText } from '@/components/Typography';

export const StyledCardWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  maxWidth: '100%',

  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
}));

export const ContentWrapper = styled(Box)(({ theme }) => ({
  minWidth: 0,
  flex: 1,
  display: 'flex',
  flexDirection: 'column',

  '& > * + *': {
    marginTop: theme.spacing(2),
  },
}));

export const StatusContainer = styled(Box)(({ theme }) => ({
  flexWrap: 'wrap',
  display: 'flex',
  gap: theme.spacing(1),
}));

export const StatusBadge = styled(BaseText, {
  shouldForwardProp: (prop) => prop !== 'statusVariant',
})<{ statusVariant?: ExamStatus.Completed | ExamStatus.Failed }>(({ theme, statusVariant }) => ({
  border: '1px solid',
  borderRadius: '50px',
  backgroundColor: 'transparent',
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5),
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  borderColor: (() => {
    if (statusVariant === ExamStatus.Completed) return theme.palette.grey[300];

    if (statusVariant === ExamStatus.Failed) return theme.palette.error.main;

    return 'transparent';
  })(),
}));

export const ButtonsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(0.5),

  [theme.breakpoints.up('md')]: {
    width: 'auto',
    flexDirection: 'column',
  },

  [theme.breakpoints.up('lg')]: {
    marginTop: 0,
    alignItems: 'flex-end',
  },
}));

export const TitleDotTitleWrapper = styled(Box)(({ theme }) => ({
  '& .exam-title-first': {
    fontSize: '24px',
    lineHeight: '32px',
    color: theme.palette.common.black,
  },

  '& .exam-title-second': {
    color: theme.palette.text.secondary,
  },
}));

export const InfoDotTitleWrapper = styled(Box)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const LinkWrapper = styled(Box)(({ theme }) => ({
  display: 'inline',

  '& a': {
    color: theme.palette.text.secondary,
    textDecoration: 'underline',

    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

export const UnavailableStatusText = styled(Box)(({ theme }) => ({
  fontSize: '20px',
  lineHeight: '27px',
  fontWeight: 500,
  margin: 0,
  marginTop: theme.spacing(2),
}));

export const InlineLinkWrapper = styled(Box)(({ theme }) => ({
  display: 'inline',

  '& a': {
    color: theme.palette.text.secondary,
    textDecoration: 'underline',
  },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  boxShadow: 'none',
  borderRadius: '50px',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
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

  '&:disabled': {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.common.white,
  },
}));
