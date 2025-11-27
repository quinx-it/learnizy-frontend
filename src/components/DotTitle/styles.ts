import { Box, styled } from '@mui/material';

import { Heading as BaseHeading, Text as BaseText } from '@/components/Typography';

export const Container = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '0.375rem',
}));

export const StyledHeading = styled(BaseHeading)(() => ({
  minWidth: 'fit-content',
}));

export const StyledText = styled(BaseText)(() => ({
  minWidth: 'fit-content',
}));

export const SecondLabel = styled(Box)(() => ({
  fontWeight: 500,
  display: 'inline',
}));

export const Dot = styled(Box)<{ isSmall?: boolean }>(({ isSmall }) => ({
  lineHeight: 'inherit',
  backgroundColor: 'transparent !important',
  paddingLeft: '0.25rem',
  paddingRight: '0.25rem',
  fontSize: isSmall ? '16px' : '22px',
  display: 'inline',
}));
