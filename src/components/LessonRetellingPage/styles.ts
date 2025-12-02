import { Box, Divider as MuiDivider, styled } from '@mui/material';

import { Text as BaseText } from '@/components/Typography';

export const Container = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export const CardWrapperContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

export const TitleText = styled(BaseText)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));

export const StyledDivider = styled(MuiDivider)(({ theme }) => ({
  borderColor: theme.palette.grey[400],
  margin: 0,
}));

export const DescriptionText = styled(BaseText)(() => ({}));

export const EmphasisText = styled(BaseText)(({ theme }) => ({
  color: theme.palette.text.secondary,
}));
