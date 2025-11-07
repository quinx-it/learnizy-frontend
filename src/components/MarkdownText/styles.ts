import {
  Box,
  Link as MuiLink,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

export const Container = styled(Box)(() => ({}));

export const CodeBlockWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
  '& pre': {
    margin: 0,
    overflowX: 'auto',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(2),
    fontSize: '0.875rem',
  },
}));

export const InlineCode = styled('code')(({ theme }) => {
  const borderRadius =
    typeof theme.shape.borderRadius === 'number' ? theme.shape.borderRadius / 3 : 4;
  return {
    borderRadius,
    backgroundColor:
      theme.palette.mode === 'light'
        ? theme.palette.background.default
        : theme.palette.background.paper,
    padding: `${theme.spacing(0.125)} ${theme.spacing(0.5)}`,
    fontSize: '0.875rem',
  };
});

export const Paragraph = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  lineHeight: 1.75,
  margin: 0,
}));

export const ListItem = styled('li')(({ theme }) => ({
  marginBottom: theme.spacing(0.25),
  marginLeft: theme.spacing(2),
  listStyleType: 'disc',
}));

export const UnorderedList = styled('ul')(({ theme }) => ({
  marginBottom: theme.spacing(1),
  marginLeft: theme.spacing(2),
  listStyleType: 'disc',
}));

export const OrderedList = styled('ol')(({ theme }) => ({
  marginBottom: theme.spacing(1),
  marginLeft: theme.spacing(2),
  listStyleType: 'decimal',
}));

export const TableWrapper = styled(TableContainer)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  maxWidth: '100%',
}));

export const StyledTable = styled(Table)(({ theme }) => ({
  minWidth: '100%',
  borderCollapse: 'collapse',
  border: `1px solid ${theme.palette.divider}`,
  fontSize: '0.875rem',
}));

export const StyledTableHead = styled(TableHead)(() => ({}));

export const StyledTableBody = styled(TableBody)(() => ({}));

export const StyledTableRow = styled(TableRow)(() => ({}));

export const StyledTableHeader = styled(TableCell)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor:
    theme.palette.mode === 'light'
      ? theme.palette.background.default
      : theme.palette.background.paper,
  padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
  textAlign: 'left',
  fontSize: '0.875rem',
  fontWeight: 600,
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  padding: `${theme.spacing(0.5)} ${theme.spacing(1)}`,
}));

export const Blockquote = styled('blockquote')(({ theme }) => ({
  marginBottom: theme.spacing(1),
  borderLeft: `4px solid ${theme.palette.divider}`,
  paddingLeft: theme.spacing(2),
  fontStyle: 'italic',
}));

export const StyledLink = styled(MuiLink)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'underline',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

export const HorizontalRule = styled('hr')(({ theme }) => ({
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderColor: theme.palette.divider,
}));

export const Image = styled('img')(() => ({
  maxWidth: '100%',
  borderRadius: '0.25rem',
}));

export const Pre = styled('pre')(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));
