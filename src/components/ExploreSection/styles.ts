import { Box, styled } from '@mui/material';

import Link from '@/components/Link';
import SectionContent from '@/components/SectionContent';
import { Heading as BaseHeading, Text as BaseText } from '@/components/Typography';

export const StyledSectionContent = styled(SectionContent)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
}));

export const SectionWrapper = styled(Box)(() => ({
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '1140px',
}));

export const HeaderContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(6),
}));

export const SectionTitle = styled(BaseHeading)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  fontSize: '28px',
  lineHeight: '34px',

  [theme.breakpoints.up('md')]: {
    fontSize: '40px',
    lineHeight: '48px',
  },
}));

export const SectionDescription = styled(BaseText)(({ theme }) => ({
  maxWidth: '620px',
  color: theme.palette.grey[600],
}));

export const CardsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(2),

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },

  [theme.breakpoints.up('xl')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
}));

export const CardLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  borderRadius: '20px',
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(3),
  color: theme.palette.text.primary,
  textDecoration: 'none',
  transition: 'border-color 0.2s ease-in-out, background-color 0.2s ease-in-out',

  '&:hover': {
    borderColor: theme.palette.primary.main,
  },

  '&:hover .exploreArrow': {
    color: theme.palette.primary.dark,
  },

  '&:focus-visible': {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: '3px',
  },
}));

export const CardText = styled(BaseText)(({ theme }) => ({
  color: theme.palette.grey[600],
}));

export const CardAction = styled(BaseText)(({ theme }) => ({
  marginTop: 'auto',
  paddingTop: theme.spacing(2),
  textTransform: 'uppercase',
  letterSpacing: '0.12em',
  color: theme.palette.primary.main,
  transition: 'color 0.2s ease-in-out',
}));
