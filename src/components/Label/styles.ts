import { styled } from '@mui/material';
import * as LabelPrimitive from '@radix-ui/react-label';

export const StyledLabel = styled(LabelPrimitive.Root)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  fontSize: theme.typography.body1.fontSize,
  lineHeight: 1,
  fontWeight: 500,
  userSelect: 'none',

  '.group[data-disabled="true"] &': {
    pointerEvents: 'none',
    opacity: 0.5,
  },

  'input:disabled ~ &, input[disabled] ~ &, [data-disabled="true"] ~ &': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
}));
