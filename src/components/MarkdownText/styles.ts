import { Box, styled } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

export const Wrapper = Box;

export const CodeBlock = styled(SyntaxHighlighter)(() => ({
  margin: '0.5rem 0',
  overflowX: 'auto',
  borderRadius: '0.5rem',
  padding: '1rem',
  fontSize: '0.875rem',
}));

export const InlineCode = styled('code')(({ theme }) => ({
  borderRadius: '0.25rem',
  backgroundColor: theme.palette.grey[100],
  padding: '0.125rem 0.25rem',
  fontSize: '0.875rem',
}));

export const Paragraph = styled(Box)(() => ({
  marginBottom: '0.5rem',
  lineHeight: 1.625,
}));

export const ListItem = styled('li')(() => ({
  marginBottom: '0.25rem',
  marginLeft: '1rem',
  listStyle: 'disc',
}));

export const UnorderedList = styled('ul')(() => ({
  marginBottom: '0.5rem',
  marginLeft: '1rem',
  listStyle: 'disc',
}));

export const OrderedList = styled('ol')(() => ({
  marginBottom: '0.5rem',
  marginLeft: '1rem',
  listStyle: 'decimal',
}));

export const TableWrapper = styled(Box)(() => ({
  marginBottom: '1rem',
  maxWidth: '100%',
  overflowX: 'auto',
}));

export const StyledTable = styled('table')(({ theme }) => ({
  minWidth: '100%',
  borderCollapse: 'collapse',
  border: `1px solid ${theme.palette.grey[300]}`,
  fontSize: '0.875rem',
}));

export const TableHeaderCell = styled('th')(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[300]}`,
  backgroundColor: theme.palette.grey[100],
  padding: '0.25rem 0.5rem',
  textAlign: 'left',
  fontSize: '0.875rem',
  fontWeight: 600,
}));

export const TableCell = styled('td')(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[300]}`,
  padding: '0.25rem 0.5rem',
}));

export const Blockquote = styled('blockquote')(({ theme }) => ({
  marginBottom: '0.5rem',
  borderLeft: `4px solid ${theme.palette.grey[400]}`,
  paddingLeft: '1rem',
  fontStyle: 'italic',
}));

export const Anchor = styled('a')(({ theme }) => ({
  color: theme.palette.link.main,
  textDecoration: 'underline',
}));

export const HorizontalRule = styled('hr')(({ theme }) => ({
  margin: '1rem 0',
  borderColor: theme.palette.grey[300],
}));

export const Image = styled('img')(() => ({
  maxWidth: '100%',
  borderRadius: '0.25rem',
}));

export const Preformatted = styled('pre')(() => ({
  marginBottom: '0.5rem',
}));
