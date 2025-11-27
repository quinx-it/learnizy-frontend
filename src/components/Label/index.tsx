'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import { ComponentProps, FC } from 'react';

import { StyledLabel } from './styles';

const Label: FC<ComponentProps<typeof LabelPrimitive.Root>> = ({ className, ...props }) => {
  return <StyledLabel data-slot="label" className={className} {...props} />;
};

export default Label;
