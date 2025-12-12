'use client';

import { type ComponentProps, type FC } from 'react';

import { StyledLabel } from './styles';

import type * as LabelPrimitive from '@radix-ui/react-label';

const Label: FC<ComponentProps<typeof LabelPrimitive.Root>> = ({ className, ...props }) => {
  return <StyledLabel data-slot="label" className={className} {...props} />;
};

export default Label;
