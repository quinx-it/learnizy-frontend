import { Box, styled } from '@mui/material';

import CardWrapper from '@/components/CardWrapper';

export const Container = styled(CardWrapper)(() => ({
  height: 'fit-content',
  maxWidth: '100%',
}));

export const HeadingWrapper = styled(Box)(() => ({
  marginBottom: '1rem',
}));

export const Divider = styled('hr')(({ theme }) => ({
  borderColor: theme.palette.divider,
  borderStyle: 'solid',
  borderWidth: '0 0 1px 0',
  marginTop: 0,
  marginLeft: 0,
  marginRight: 0,
  marginBottom: '2rem',
  padding: 0,
}));
