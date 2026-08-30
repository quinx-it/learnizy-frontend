import { Box, Button as MuiButton, styled } from '@mui/material';

export const CoursesGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(1),
  alignItems: 'stretch',

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
}));

export const PageContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const CreateButtonWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1),
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

export const DialogContentWrapper = styled(Box)(() => ({
  '& [data-slot="dialog-content"]': {
    maxWidth: '28rem',
  },
}));

export const DialogFooterWrapper = styled(Box)(({ theme }) => ({
  flexWrap: 'wrap',
  '& [data-slot="dialog-footer"]': {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(0.5),
  },
}));

export const FormContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
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

export const CourseCardWrapper = styled(Box)(() => ({
  height: '100%',
  width: '100%',
  maxWidth: '100%',
}));
