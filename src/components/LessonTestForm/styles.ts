import { Box, styled } from '@mui/material';

export const QuestionItem = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.grey[500]}`,
  paddingTop: '4rem',
  paddingBottom: '4rem',

  '&:first-of-type': {
    paddingTop: 0,
  },
}));

export const ActionsWrapper = styled(Box)(() => ({
  marginTop: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
  alignItems: 'flex-start',
}));

export const SubmitButtonWrapper = styled(Box)(() => ({
  display: 'inline-flex',
  width: 'auto',
}));

export const ErrorText = styled(Box)(({ theme }) => ({
  color: theme.palette.error.main,
  marginLeft: '2rem',
  fontSize: '12px',
  lineHeight: '16px',
  fontWeight: 500,
  transition: 'color 0.2s ease-in-out',
}));
