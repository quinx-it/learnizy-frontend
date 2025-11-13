import { Box, styled } from '@mui/material';

import Textarea from '@/components/Textarea';

export const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.1rem',
}));

export const QuestionNumber = styled(Box)(({ theme }) => ({
  marginBottom: '0.75rem',
  '& > *': {
    color: `${theme.palette.primary.main} !important`,
  },
}));

export const QuestionText = styled(Box)(() => ({
  marginBottom: '1.25rem',
}));

export const RadioGroupWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  width: 'fit-content',
  marginLeft: 0,
  marginRight: 0,
  gap: '0.75rem',
}));

export const StyledTextarea = styled(Textarea)(() => ({
  width: '100%',
  '& textarea': {
    height: 'auto !important',
    minHeight: '60px !important',
    resize: 'none !important',
    paddingTop: '0.125rem',
    paddingBottom: '0.125rem',
  },
}));

export const ErrorMessage = styled('p')(({ theme }) => ({
  color: theme.palette.error.main,
}));
