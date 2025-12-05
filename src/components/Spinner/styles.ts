import { Box, keyframes, styled } from '@mui/material';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const StyledSpinnerWrapper = styled(Box)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.main,
  '& svg': {
    color: theme.palette.primary.main,
  },
}));

export const StyledCircle = styled('svg')(() => ({
  animation: `${spin} 1s linear infinite`,
}));

export const StyledRing = styled('svg')(() => ({}));
