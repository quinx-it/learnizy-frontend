import { Box, styled } from '@mui/material';

import Input from '@/components/Input';

export const Container = styled(Box)(() => ({
  position: 'relative',
}));

export const StyledDateInput = styled(Input)(({ theme }) => ({
  '& input': {
    backgroundColor: theme.palette.background.default,
    borderRadius: '32px',
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(5),
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
}));

export const IconWrapper = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: theme.spacing(0.75),
  bottom: theme.spacing(1),
  cursor: 'pointer',
}));
