import { Box, styled } from '@mui/material';

import Link from '@/components/Link';
import { Heading as BaseHeading, Text as BaseText } from '@/components/Typography';

export const Page = styled('main')(({ theme }) => ({
  minHeight: '100dvh',
  backgroundColor: theme.palette.background.default,
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2.5),
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(8),

  [theme.breakpoints.up('md')]: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    paddingTop: theme.spacing(8),
  },
}));

export const Container = styled(Box)(() => ({
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '760px',
}));

export const BackLink = styled(Link)(({ theme }) => ({
  display: 'inline-block',
  marginBottom: theme.spacing(4),
  fontSize: '16px',
  lineHeight: '22px',
  fontWeight: 500,
  textDecoration: 'none',
  color: theme.palette.primary.main,

  '&:hover': {
    textDecoration: 'underline',
    textUnderlineOffset: '4px',
  },

  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: '3px',
    borderRadius: '2px',
  },
}));

export const Title = styled(BaseHeading)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  color: theme.palette.text.primary,
  fontSize: '28px',
  lineHeight: '34px',

  [theme.breakpoints.up('md')]: {
    fontSize: '40px',
    lineHeight: '48px',
  },
}));

export const Updated = styled(BaseText)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  color: theme.palette.grey[500],
}));

export const Draft = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  borderRadius: '12px',
  borderLeft: `3px solid ${theme.palette.warning.main}`,
  backgroundColor: 'rgba(233, 191, 37, 0.12)',
  padding: theme.spacing(2),
  color: theme.palette.text.primary,
}));

export const Intro = styled(BaseText)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  color: theme.palette.grey[700],
}));

export const Section = styled('section')(({ theme }) => ({
  marginBottom: theme.spacing(4),
}));

export const SectionTitle = styled(BaseHeading)(({ theme }) => ({
  marginBottom: theme.spacing(1.5),
  color: theme.palette.text.primary,
}));

export const SectionText = styled(BaseText)(({ theme }) => ({
  color: theme.palette.grey[700],
}));
