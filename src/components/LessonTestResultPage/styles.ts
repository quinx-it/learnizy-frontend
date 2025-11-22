import { Box, styled } from '@mui/material';

import CardWrapper from '@/components/CardWrapper';

export const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
}));

export const ResultCard = styled(CardWrapper)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
}));

export const ResultHeader = Box;

export const ResultTitle = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginBottom: '1.25rem',
}));

export const Divider = styled('hr')(({ theme }) => ({
  borderColor: theme.palette.gray,
  marginBottom: '1rem',
  border: 'none',
  borderTop: `1px solid ${theme.palette.gray}`,
}));

export const ResultInfo = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
}));

export const ResultText = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const AnswersList = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
}));

export const AnswerCard = styled(CardWrapper)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
}));

export const QuestionText = styled(Box)(() => ({
  marginBottom: '1.25rem',
  '& > *': {
    fontSize: '20px !important',
    lineHeight: '27px !important',
    fontWeight: '500 !important',
    transition: 'color 0.2s ease-in-out',
  },
}));

export const AnswerText = styled(Box)(({ theme }) => ({
  color: theme.palette.primary.main,
  wordBreak: 'break-word',
}));

export const EvaluationTextCorrect = styled(Box)(({ theme }) => ({
  color: theme.palette.success.main,
}));

export const EvaluationTextPartial = styled(Box)(({ theme }) => ({
  color: theme.palette.warning.main,
}));

export const EvaluationTextIncorrect = styled(Box)(({ theme }) => ({
  color: theme.palette.error.main,
}));

export const EvaluationTextPending = styled(Box)(({ theme }) => ({
  color: theme.palette.grey[600],
}));

export const NotesText = styled(Box)(({ theme }) => ({
  color: theme.palette.grey[500],
}));
