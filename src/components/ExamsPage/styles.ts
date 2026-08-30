import { Box, styled } from '@mui/material';

import { Heading as BaseHeading } from '@/components/Typography';

export const Container = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(3),
}));

export const HeaderContainer = styled(Box)(({ theme }) => ({
  flexWrap: 'wrap',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  color: theme.palette.primary.main,
}));

export const StyledHeading = styled(BaseHeading)(({ theme }) => ({
  color: theme.palette.common.black,
}));

export const StyledHeadingSecondary = styled(BaseHeading)(() => ({
  color: 'inherit',
}));

export const IconWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
