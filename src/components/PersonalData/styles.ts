import { Divider as MuiDivider, styled } from '@mui/material';

import { Heading as BaseHeading } from '@/components/Typography';

import { Container } from '@/components/CardWrapper/styles';

export const StyledCardWrapper = styled(Container)(() => ({
  height: 'fit-content',
  maxWidth: '100%',
}));

export const StyledHeading = styled(BaseHeading)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

export const StyledDivider = styled(MuiDivider)(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));
