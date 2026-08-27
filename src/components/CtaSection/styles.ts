import { Box, styled } from '@mui/material';

import SectionContent from '@/components/SectionContent';
import { Heading as BaseHeading, Text as BaseText } from '@/components/Typography';

export const StyledSectionContent = styled(SectionContent)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
}));

export const SectionWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(3),
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '1140px',
}));

export const SectionTitle = styled(BaseHeading)(() => ({
  maxWidth: '720px',
}));

export const SectionText = styled(BaseText)(() => ({
  maxWidth: '560px',
  color: 'rgba(12, 12, 12, 0.72)',
}));
