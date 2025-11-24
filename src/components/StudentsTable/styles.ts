import { Box, styled } from '@mui/material';

import Button from '@/components/Button';
import Input from '@/components/Input';
import Link from '@/components/Link';

export const SearchContainer = styled(Box)(() => ({
  position: 'relative',
  marginBottom: '1rem',
}));

export const SearchInput = styled(Input)(() => ({
  width: '100%',
  maxWidth: '24rem',

  '& input': {
    paddingLeft: '2.5rem',
  },
}));

export const TableWrapper = styled(Box)(({ theme }) => ({
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  overflowX: 'auto',
  borderRadius: '0.375rem',
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
    paddingLeft: hasPadding ? '1rem' : 0,
    paddingRight: hasPadding ? '1rem' : 0,
    paddingTop: '0.75rem',
    paddingBottom: '0.75rem',
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
    paddingTop: '0.75rem',
    paddingBottom: '0.75rem',
    paddingLeft: hasPadding ? '1rem' : 0,
    paddingRight: hasPadding ? '1rem' : 0,
    gap: '0.25rem',
  }),
);

export const EditButton = styled(Button)(({ theme }) => ({
  color: theme.palette.info.main,
  border: 'none',
  padding: '0.5rem',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.background.default,
  },
}));

export const CopyButton = styled(Button)(({ theme }) => ({
  border: 'none',
  padding: '0.25rem',
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
  gap: '0.5rem',
  borderTop: `1px solid ${theme.palette.divider}`,
  paddingLeft: '1rem',
  paddingRight: '1rem',
  paddingTop: '0.75rem',
  paddingBottom: '0.75rem',
}));

export const EmptyMessage = styled(Box)(({ theme }) => ({
  gridColumn: '1 / -1',
  borderTop: `1px solid ${theme.palette.divider}`,
  paddingTop: '2rem',
  paddingBottom: '2rem',
  textAlign: 'center',
  color: theme.palette.grey[500],
}));
