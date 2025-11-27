import { Box, Typography, styled } from '@mui/material';

export const StyledLinkWrapper = styled(Box)(() => ({
  '& a': {
    textDecoration: 'underline',
  },
}));

export const UnorderedList = styled(Box)(({ theme }) => ({
  listStyleType: 'disc',
  paddingLeft: '1.25rem',
  '&::marker': {
    fontSize: '1.125rem',
    color: theme.palette.text.primary,
  },
}));

export const CodeBlock = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  border: `1px solid ${theme.palette.divider}`,
  width: '100%',
  maxWidth: '100%',
  overflowX: 'auto',
  borderRadius: '1rem',
  borderColor: theme.palette.divider,
  padding: '1rem',
  margin: 0,
}));

export const Code = styled(Box)(() => ({
  display: 'block',
  whiteSpace: 'pre',
  fontFamily: 'monospace',
}));

export const Figure = styled(Box)(() => ({
  width: 'fit-content',
}));

export const Figcaption = styled(Box)(() => ({
  textAlign: 'center',
}));

export const AdviceContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.info.main,
  width: 'fit-content',
  borderRadius: '1rem',
  padding: '1rem',
  color: theme.palette.primary.main,
}));

export const WarningContainer = styled(Box)(({ theme }) => ({
  width: 'fit-content',
  borderRadius: '1rem',
  backgroundColor: `${theme.palette.error.main}4D`,
  padding: '1rem',
  color: theme.palette.error.main,
}));

export const BoxedTextContainer = styled(Box)(({ theme }) => ({
  borderRadius: '1rem',
  border: `1px solid ${theme.palette.divider}`,
  padding: '1rem',
}));

export const StrongText = styled(Typography)(() => ({
  fontWeight: 600,
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '0.75rem',
}));

export const StrongTextWithGap = styled(StrongText)(() => ({
  gap: '0.5rem',
}));

export const StrongTextWithoutGap = styled(Typography)(() => ({
  fontWeight: 600,
  marginBottom: '0.75rem',
}));
