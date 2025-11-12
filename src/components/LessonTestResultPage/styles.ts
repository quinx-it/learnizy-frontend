import { styled } from '@mui/material';

import CardWrapper from '@/components/CardWrapper';

export const Container = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
}));

export const ResultCard = styled(CardWrapper)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
}));

export const ResultHeader = styled('div')(() => ({}));

export const ResultTitle = styled('div')(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: '1.25rem',
}));

export const Divider = styled('hr')(({ theme }) => ({
  borderColor: theme.palette.gray,
  marginBottom: '1rem',
  border: 'none',
  borderTop: `1px solid ${theme.palette.gray}`,
}));

export const ResultInfo = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
}));

export const ResultText = styled('div')(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const AnswersList = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
}));

export const AnswerCard = styled(CardWrapper)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
}));

export const QuestionText = styled('div')(() => ({
  marginBottom: '1.25rem',
  '& > *': {
    fontSize: '20px !important',
    lineHeight: '27px !important',
    fontWeight: '500 !important',
    transition: 'color 0.2s ease-in-out',
  },
}));

export const AnswerText = styled('div')(({ theme }) => ({
  color: theme.palette.primary.main,
  wordBreak: 'break-word',
}));

export const EvaluationTextCorrect = styled('div')(() => ({
  color: '#16a34a',
}));

export const EvaluationTextPartial = styled('div')(() => ({
  color: '#ca8a04',
}));

export const EvaluationTextIncorrect = styled('div')(() => ({
  color: '#dc2626',
}));

export const EvaluationTextPending = styled('div')(({ theme }) => ({
  color: theme.palette.grey[600],
}));

export const NotesText = styled('div')(({ theme }) => ({
  color: theme.palette.grey[500],
}));
