import { Box, styled } from '@mui/material';

export const StyledSpinnerWrapper = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.main,
  '& svg': {
    color: theme.palette.primary.main,
  },
}));
