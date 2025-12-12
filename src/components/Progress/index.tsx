import { useTheme } from '@mui/material';
import { type FC } from 'react';

import { type IProgressBarProps } from './typings';

import { ProgressIndicator, StyledCircle, StyledCircularSVG, StyledProgressBar } from './styles';

const ProgressBar: FC<IProgressBarProps> = (props) => {
  const { value, className, variant = 'linear', size = 48, strokeWidth = 4 } = props;
  const theme = useTheme();

  if (variant === 'circular') {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (value / 100) * circumference;

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
    <StyledProgressBar value={value} strokeWidth={strokeWidth} className={className}>
      <ProgressIndicator style={{ transform: `translateX(-${100 - value}%)` }} />
    </StyledProgressBar>
  );
};

export default ProgressBar;
