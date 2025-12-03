import { Box, Divider as MuiDivider, styled } from '@mui/material';

import { AnswerEvaluation } from '@/api/endpoints/test';
import { Text as BaseText } from '@/components/Typography';

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(3),
}));

export const ResultCardContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2.5),
}));

export const ResultTitle = styled(BaseText)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(0.5),
}));

export const StyledDivider = styled(MuiDivider)(({ theme }) => ({
  borderColor: theme.palette.grey[400],
  marginBottom: theme.spacing(0.5),
}));

export const ResultsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.25),
}));

export const ResultText = styled(BaseText)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const AnswersContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export const AnswerCardContent = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
}));

export const QuestionText = styled(BaseText)(({ theme }) => ({
  fontSize: '20px',
  lineHeight: '27px',
  fontWeight: 500,
  marginBottom: theme.spacing(2.5),
  transition: 'color 0.2s ease-in-out',
}));

export const AnswerText = styled(BaseText)(({ theme }) => ({
  color: theme.palette.text.secondary,
  wordBreak: 'break-word',
}));

export const EvaluationText = styled(BaseText, {
  shouldForwardProp: (prop) => prop !== 'evaluation',
})<{ evaluation: AnswerEvaluation }>(({ theme, evaluation }) => {
  const getColor = () => {
    if (evaluation === AnswerEvaluation.CORRECT) return theme.palette.success.main;

    if (evaluation === AnswerEvaluation.PARTIAL) return theme.palette.warning.main;

    if (evaluation === AnswerEvaluation.INCORRECT) return theme.palette.error.main;

    return theme.palette.grey[500];
  };

  return {
    color: getColor(),
  };
});

export const NotesText = styled(BaseText)(({ theme }) => ({
  color: theme.palette.grey[500],
}));
