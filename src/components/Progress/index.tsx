import { useTheme } from '@mui/material';
import { type FC } from 'react';

import { type IProgressBarProps } from './typings';

import { ProgressIndicator, StyledCircle, StyledCircularSVG, StyledProgressBar } from './styles';

const ProgressBar: FC<IProgressBarProps> = (props) => {
  const { value, className, variant = 'linear', size = 48, strokeWidth = 4 } = props;
  const theme = useTheme();

  const safeValue = Number.isFinite(value) ? Math.min(100, Math.max(0, value)) : 0;

  if (variant === 'circular') {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (safeValue / 100) * circumference;

    return (
      <StyledCircularSVG size={size} className={className}>
        <StyledCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={theme.palette.info.main}
          strokeWidth={strokeWidth}
        />
        <StyledCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={theme.palette.primary.main}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </StyledCircularSVG>
    );
  }

  return (
    <StyledProgressBar value={safeValue} strokeWidth={strokeWidth} className={className}>
      <ProgressIndicator style={{ transform: `translateX(-${100 - safeValue}%)` }} />
    </StyledProgressBar>
  );
};

export default ProgressBar;
