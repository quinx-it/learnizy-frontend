import { Box, Button as MuiButton, styled } from '@mui/material';

export const Form = styled('form')(() => ({
  width: '100%',
}));

export const RadioGroupContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const ErrorText = styled(Box)(({ theme }) => ({
  color: theme.palette.error.main,
  marginTop: theme.spacing(0.5),
}));

export const FormGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridTemplateRows: 'repeat(5, 1fr) auto',
  gap: `${theme.spacing(4)} ${theme.spacing(2)}`,
}));

export const FormFieldFullWidth = styled(Box)(() => ({
  gridColumn: 'span 2',
}));

export const ButtonsContainer = styled(Box)(({ theme }) => ({
  gridColumn: 'span 2',
  display: 'flex',
  gap: theme.spacing(0.5),
}));

export const ButtonWrapper = styled(Box)(() => ({
  flex: 1,
  fontSize: '16px',

  '& > *': {
    width: '100%',
    fontSize: '16px',
  },
}));

export const WhiteButton = styled(MuiButton)(({ theme }) => ({
  textTransform: 'none',
  boxShadow: 'none',
  borderRadius: '50px',
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  border: `1px solid ${theme.palette.primary.main}`,
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  fontSize: '16px',
  lineHeight: '22px',
  position: 'relative',
  overflow: 'hidden',

  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    boxShadow: 'none',
  },
}));

export const BlueButton = styled(MuiButton)(({ theme }) => ({
  textTransform: 'none',
  boxShadow: 'none',
  borderRadius: '50px',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
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
