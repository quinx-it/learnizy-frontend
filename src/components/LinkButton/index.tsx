'use client';

import { type FC } from 'react';

import { type LinkButtonProps } from './typings';

import { StyledLinkButton } from './styles';

const LinkButton: FC<LinkButtonProps> = (props) => {
  const { variant = 'blue', size = 'large', children, ...rest } = props;

  return (
    <StyledLinkButton variant={variant} size={size} {...rest}>
      {children}
    </StyledLinkButton>
  );
};

export default LinkButton;
