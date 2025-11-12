import { styled } from '@mui/material';

export const Form = styled('form')(() => ({}));

export const QuestionsList = styled('ul')(() => ({}));

export const QuestionItem = styled('li')(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.gray}`,
  paddingTop: '4rem',
  paddingBottom: '4rem',
  '&:first-child': {
    paddingTop: 0,
  },
}));

export const ActionsWrapper = styled('div')(() => ({
  marginTop: '2rem',
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
  alignItems: 'flex-start',
}));

export const SubmitButtonWrapper = styled('div')(() => ({
  display: 'inline-flex',
  width: 'auto',
}));

export const ErrorText = styled('span')(({ theme }) => ({
  color: theme.palette.error.main,
  marginLeft: '2rem',
  fontSize: '12px',
  lineHeight: '16px',
  fontWeight: 500,
  transition: 'color 0.2s ease-in-out',
}));
