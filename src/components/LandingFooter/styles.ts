import { Box, styled } from '@mui/material';
import Image from 'next/image';

import Link from '@/components/Link';
import SectionContent from '@/components/SectionContent';
import { Text as BaseText } from '@/components/Typography';

// The footer closes the page, it does not need a full section's breathing room.
export const StyledSectionContent = styled(SectionContent)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.common.black,
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(4),

  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(4),
  },

  [theme.breakpoints.up('xl')]: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
  },
}));

export const FooterWrapper = styled(Box)(() => ({
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '1140px',
}));

export const TopGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(4),
  paddingBottom: theme.spacing(4),

  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr) minmax(0, 1fr)',
    gap: theme.spacing(5),
  },
}));

export const BrandColumn = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(2),
  minWidth: 0,
}));

export const StyledLogo = styled(Image)(() => ({
  height: 'auto',
  width: '128px',
}));

export const Statement = styled(BaseText)(({ theme }) => ({
  maxWidth: '400px',
  fontSize: '22px',
  lineHeight: '30px',
  color: theme.palette.common.white,

  [theme.breakpoints.up('md')]: {
    fontSize: '26px',
    lineHeight: '34px',
  },
}));

export const LinkColumn = styled(Box)(() => ({
  minWidth: 0,
}));

export const ColumnTitle = styled(BaseText)(({ theme }) => ({
  display: 'block',
  marginBottom: theme.spacing(2),
  textTransform: 'uppercase',
  letterSpacing: '0.16em',
  color: theme.palette.info.main,
}));

export const LinkList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1.25),
}));

export const FooterLink = styled(Link)(({ theme }) => ({
  alignSelf: 'flex-start',
  fontSize: '16px',
  lineHeight: '22px',
  fontWeight: 500,
  textDecoration: 'none',
  color: 'rgba(250, 250, 250, 0.7)',
  transition: 'color 0.2s ease-in-out',

  '&:hover': {
    color: theme.palette.common.white,
    textDecoration: 'underline',
    textUnderlineOffset: '5px',
    textDecorationThickness: '1px',
  },

  '&:focus-visible': {
    outline: `2px solid ${theme.palette.secondary.main}`,
    outlineOffset: '4px',
    borderRadius: '2px',
  },
}));

export const BottomBar = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: theme.spacing(1.5),
  paddingTop: theme.spacing(2.5),
  borderTop: '1px solid rgba(169, 219, 233, 0.16)',
}));

export const Tagline = styled(BaseText)(() => ({
  color: 'rgba(250, 250, 250, 0.5)',
}));

export const Copyright = styled(BaseText)(() => ({
  color: 'rgba(250, 250, 250, 0.4)',
}));
