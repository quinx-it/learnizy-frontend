import { Box, styled } from '@mui/material';

import Checkbox from '@/components/Checkbox';
import Label from '@/components/Label';

export const Container = styled(Box)(() => ({
  display: 'flex',
  flexShrink: 0,
  alignItems: 'center',
  gap: '0.75rem',
}));

export const StyledCheckbox = styled(Checkbox)(() => ({
  display: 'inline-block',
  minHeight: '1.125rem',
  minWidth: '1.125rem',
}));

export const StyledLabel = styled(Label)(() => ({
  display: 'inline-block',
  fontSize: '12px',
}));
