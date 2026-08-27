import { Box, styled } from '@mui/material';

import SectionContent from '@/components/SectionContent';
import { Heading as BaseHeading, Text as BaseText } from '@/components/Typography';

export const StyledSectionContent = styled(SectionContent)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

export const SectionWrapper = styled(Box)(() => ({
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '1140px',
}));

export const HeaderContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(6),
}));

export const SectionTitle = styled(BaseHeading)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  color: theme.palette.text.primary,
}));

export const SectionDescription = styled(BaseText)(({ theme }) => ({
  maxWidth: '620px',
  color: theme.palette.grey[600],
}));

export const StepsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(2),

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [theme.breakpoints.up('xl')]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
}));

export const StepCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
  borderRadius: '20px',
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
}));

export const StepNumber = styled(BaseHeading)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const StepTitle = styled(BaseHeading)(() => ({
  minWidth: 0,
}));

export const StepText = styled(BaseText)(({ theme }) => ({
  color: theme.palette.grey[600],
}));

// The chip is what separates the three free steps from the one you pay for.
export const CostChip = styled(BaseText, {
  shouldForwardProp: (prop) => prop !== 'isPaid',
})<{ isPaid: boolean }>(({ theme, isPaid }) => ({
  alignSelf: 'flex-start',
  marginTop: 'auto',
  borderRadius: '50px',
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5),
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  backgroundColor: isPaid ? theme.palette.secondary.main : theme.palette.info.main,
  color: theme.palette.text.primary,
}));
