'use client';

import { Box, keyframes, styled } from '@mui/material';

import { Icon } from '@/components/Icon';
import { IIconProps } from '@/types';

const micWaveAnimation = keyframes`
  0% { transform: scaleY(1); }
  50% { transform: scaleY(1.3); }
  100% { transform: scaleY(1); }
`;

const Container = styled(Box)(() => ({
  display: 'flex',
  height: '36px',
  width: '36px',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '50%',
  backgroundColor: '#E8F8FC',
}));

const BarsContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1px',
}));

const Bar = styled(Box)<{ height: number; index: number }>(({ height, index }) => ({
  width: '1.5px',
  borderRadius: '1px',
  backgroundColor: '#238BA7',
  height: `${height}px`,
  animation: `${micWaveAnimation} 1s ease-in-out ${index * 0.1}s infinite alternate`,
}));

export const MicRecordIcon = ({ className }: IIconProps) => {
  const barHeights = [5, 12, 8, 5, 11, 3];

  return (
    <Icon className={className}>
      <Container>
        <BarsContainer>
          {barHeights.map((height, index) => (
            <Bar key={index} height={height} index={index} />
          ))}
        </BarsContainer>
      </Container>
    </Icon>
  );
};
