import { styled } from '@mui/material';
import * as ProgressPrimitive from '@radix-ui/react-progress';

export const StyledCircularSVG = styled('svg')<{ size: number }>(({ size }) => ({
  width: size,
  height: size,
  transform: 'rotate(-90deg)',
}));

export const StyledCircle = styled('circle')(() => ({
  fill: 'transparent',
  transition: 'all 0.3s ease',
}));

export const StyledProgressBar = styled(ProgressPrimitive.Root)<{ strokeWidth?: number }>(
  ({ theme, strokeWidth = 4 }) => ({
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    borderRadius: '9999px',
    backgroundColor: theme.palette.info.main,
    height: `${strokeWidth}px`,
  }),
);

export const ProgressIndicator = styled(ProgressPrimitive.Indicator)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  height: '100%',
  width: '100%',
  flex: 1,
  transition: 'all 0.3s ease',
}));
