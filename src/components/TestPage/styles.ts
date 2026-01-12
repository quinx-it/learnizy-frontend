import { Box, Divider as MuiDivider, styled } from '@mui/material';

import CardWrapper from '@/components/CardWrapper';
import { Text } from '@/components/Typography';

export const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
}));

export const CardContent = styled(CardWrapper)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.25rem',
}));

export const TitleWrapper = styled(Box)(() => ({
  marginBottom: '1.25rem',

  '& > *': {
    color: 'inherit',
  },
}));

export const Divider = styled(MuiDivider)(({ theme }) => ({
  borderColor: theme.palette.gray,
  marginTop: 0,
  marginLeft: 0,
  marginRight: 0,
  marginBottom: '1rem',
}));

export const InfoContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
}));

export const DescriptionWrapper = styled(Box)(() => ({
  marginBottom: '1rem',
  whiteSpace: 'pre-wrap',

  '& > *': {
    maxWidth: '90%',
  },
}));

export const MediumText = styled(Text)(({ theme }) => ({
  color: theme.palette.primary.main,
}));
