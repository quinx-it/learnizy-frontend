'use client';

import { FC } from 'react';

import { ICheckboxWithLabelProps } from './typings';

import { Container, StyledCheckbox, StyledLabel } from './styles';

const CheckboxWithLabel: FC<ICheckboxWithLabelProps> = (props) => {
  const { children, checked, onCheckedChange, ...restProps } = props;

  return (
    <Container>
      <StyledCheckbox checked={checked} onCheckedChange={onCheckedChange} {...restProps} />
      <StyledLabel>{children}</StyledLabel>
    </Container>
  );
};

export default CheckboxWithLabel;
