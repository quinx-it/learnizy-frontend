import { Box, Divider as MuiDivider, styled } from '@mui/material';

import CardWrapper from '@/components/CardWrapper';

export const Container = styled(CardWrapper)(() => ({
  height: 'fit-content',
  maxWidth: '100%',
}));

export const HeadingWrapper = styled(Box)(() => ({
  marginBottom: '1rem',
}));

export const Divider = styled(MuiDivider)(() => ({
  marginTop: 0,
  marginLeft: 0,
  marginRight: 0,
  marginBottom: '2rem',
}));
