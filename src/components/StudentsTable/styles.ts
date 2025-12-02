import { Box, styled } from '@mui/material';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Link from '@/components/Link';

export const SearchContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(1),
}));

export const SearchInput = styled(Input)(({ theme }) => ({
  width: '100%',
  maxWidth: theme.spacing(30),

  '& input': {
    paddingLeft: theme.spacing(3),
  },
}));

export const TableWrapper = styled(Box)(({ theme }) => ({
  boxShadow: theme.shadows[2],
  overflowX: 'auto',
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
}));

export const TableGrid = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns:
    '60px minmax(140px, 1fr) minmax(250px, 2fr) minmax(120px, 1fr) minmax(200px, 2fr) minmax(160px, 1fr) minmax(208px, 1fr)',
  textAlign: 'center',
}));

export const HeaderCell = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'hasBorder' && prop !== 'hasPadding',
})<{ hasBorder?: boolean; hasPadding?: boolean }>(
  ({ theme, hasBorder = true, hasPadding = false }) => ({
    borderRight: hasBorder ? `1px solid ${theme.palette.divider}` : 'none',
    backgroundColor: theme.palette.info.main,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: hasPadding ? theme.spacing(1.25) : 0,
    paddingRight: hasPadding ? theme.spacing(1.25) : 0,
    paddingTop: theme.spacing(0.75),
    paddingBottom: theme.spacing(0.75),
  }),
);

export const RowWrapper = styled(Box)(() => ({
  display: 'contents',
}));

export const Cell = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'hasBorder' && prop !== 'hasPadding',
})<{ hasBorder?: boolean; hasPadding?: boolean }>(
  ({ theme, hasBorder = true, hasPadding = false }) => ({
    borderTop: `1px solid ${theme.palette.divider}`,
    borderRight: hasBorder ? `1px solid ${theme.palette.divider}` : 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: theme.spacing(0.75),
    paddingBottom: theme.spacing(0.75),
    paddingLeft: hasPadding ? theme.spacing(1.25) : 0,
    paddingRight: hasPadding ? theme.spacing(1.25) : 0,
    gap: theme.spacing(0.25),
  }),
);

export const EditButton = styled(Button)(({ theme }) => ({
  color: theme.palette.info.main,
  border: 'none',
  padding: theme.spacing(0.625),
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.background.default,
  },
}));

export const CopyButton = styled(Button)(({ theme }) => ({
  border: 'none',
  padding: theme.spacing(0.25),
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'transparent',
    color: theme.palette.text.primary,
  },
  '&:active': {
    color: `${theme.palette.text.primary} !important`,
  },
}));

export const LinkCell = styled(Link)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(0.625),
  borderTop: `1px solid ${theme.palette.divider}`,
  paddingLeft: theme.spacing(1.25),
  paddingRight: theme.spacing(1.25),
  paddingTop: theme.spacing(0.75),
  paddingBottom: theme.spacing(0.75),
}));

export const EmptyMessage = styled(Box)(({ theme }) => ({
  gridColumn: '1 / -1',
  borderTop: `1px solid ${theme.palette.divider}`,
  paddingTop: theme.spacing(2.5),
  paddingBottom: theme.spacing(2.5),
  textAlign: 'center',
  color: theme.palette.grey[500],
}));

export const PersonIconWrapper = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '16px',
  height: '16px',

  '& svg': {
    width: '16px',
    height: '16px',
  },
}));
