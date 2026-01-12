import { Box, styled } from '@mui/material';
import Image from 'next/image';

import { Text } from '@/components/Typography';

export const HeaderContainer = styled(Box)(() => ({
  marginBottom: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  gap: '0.5rem',
}));

export const TitleWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
}));

export const StatisticsWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
}));

export const MediumText = styled(Text)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const CalendarIcon = styled(Image)(({ theme }) => ({
  color: theme.palette.info.main,
}));
