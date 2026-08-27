import { Box, styled } from '@mui/material';
import Image from 'next/image';

import Link from '@/components/Link';
import SectionContent from '@/components/SectionContent';
import { Text as BaseText } from '@/components/Typography';

export const StyledSectionContent = styled(SectionContent)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.common.black,
}));

export const FooterWrapper = styled(Box)(() => ({
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '1140px',
}));

export const Columns = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(5),
  paddingBottom: theme.spacing(5),

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'minmax(0, 1.4fr) repeat(2, minmax(0, 1fr))',
    gap: theme.spacing(4),
  },
}));

export const BrandColumn = styled(Box)(() => ({
  minWidth: 0,
}));

export const StyledLogo = styled(Image)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  height: 'auto',
  maxWidth: '100%',
}));

export const Tagline = styled(BaseText)(() => ({
  maxWidth: '320px',
  color: 'rgba(250, 250, 250, 0.6)',
}));

export const LinkColumn = styled(Box)(() => ({
  minWidth: 0,
}));

export const ColumnTitle = styled(BaseText)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  color: theme.palette.info.main,
}));

export const LinkList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
}));

export const FooterLink = styled(Link)(({ theme }) => ({
  fontSize: '16px',
  lineHeight: '22px',
  fontWeight: 500,
  textDecoration: 'none',
  color: 'rgba(250, 250, 250, 0.75)',
  transition: 'color 0.2s ease-in-out',

  '&:hover': {
    color: theme.palette.common.white,
  },

  '&:focus-visible': {
    outline: `2px solid ${theme.palette.secondary.main}`,
    outlineOffset: '3px',
  },
}));

export const BottomBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  paddingTop: theme.spacing(3),
  borderTop: '1px solid rgba(250, 250, 250, 0.12)',
}));

export const Copyright = styled(BaseText)(() => ({
  color: 'rgba(250, 250, 250, 0.5)',
}));

export const SwitcherSlot = styled(Box)(() => ({
  '& > div': {
    width: 'auto',
    paddingRight: 0,
  },
}));
