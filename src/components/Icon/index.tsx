'use client';

import { Box, styled } from '@mui/material';

import { cn } from '@/lib/utils';

import { IIconComponentProps } from './typings';

const StyledIconWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const Icon = ({ className, children }: IIconComponentProps) => {
  return (
    <StyledIconWrapper className={cn('icon-wrapper', className)}>{children}</StyledIconWrapper>
  );
};
