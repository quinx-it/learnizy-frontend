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
  gridTemplateColumns: '1fr',
  gap: `${theme.spacing(3)} ${theme.spacing(2)}`,

  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: `${theme.spacing(4)} ${theme.spacing(2)}`,
  },
}));

export const FormFieldFullWidth = styled(Box)(() => ({
  gridColumn: '1 / -1',
}));

export const ButtonsContainer = styled(Box)(({ theme }) => ({
  gridColumn: '1 / -1',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),

  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    gap: theme.spacing(0.5),
  },
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
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),

  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
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
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),

  [theme.breakpoints.up('sm')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
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
