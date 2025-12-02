import { Box, Button as MuiButton, styled } from '@mui/material';

export const ModuleProgressCardContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const ModuleCardWrapper = styled(Box)(() => ({
  height: '100%',
  width: '100%',
  maxWidth: '100%',
}));

export const ButtonsWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  display: 'flex',
  gap: theme.spacing(0.5),
}));

export const CreateButtonWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

export const FormContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

export const ModulesGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(1),

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
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

export const DialogContentWrapper = styled(Box)(() => ({
  '& [data-slot="dialog-content"]': {
    maxWidth: '28rem !important',
  },
}));

export const DialogFooterWrapper = styled(Box)(({ theme }) => ({
  '& [data-slot="dialog-footer"]': {
    display: 'flex !important',
    justifyContent: 'flex-end !important',
    gap: `${theme.spacing(0.5)} !important`,
  },
}));
