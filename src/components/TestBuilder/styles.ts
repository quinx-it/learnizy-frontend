import { Box, styled } from '@mui/material';

import { Heading as BaseHeading, Text as BaseText } from '@/components/Typography';

export const SectionHeading = styled(BaseHeading)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

export const SectionText = styled(BaseText)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
}));

export const SectionTextSmall = styled(BaseText)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

export const ActionWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

export const FormContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
}));

export const QuestionRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  padding: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
}));

export const QuestionRowHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

export const ButtonsRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(0.5),
}));

export const ButtonsFooter = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  gap: theme.spacing(0.5),
}));
