import { Box, styled } from '@mui/material';
import Image from 'next/image';

import SectionContent from '@/components/SectionContent';
import { Heading as BaseHeading, Text as BaseText } from '@/components/Typography';

export const StyledSectionContent = styled(SectionContent)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.common.black,
}));

export const SectionWrapper = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  alignItems: 'center',
  gap: theme.spacing(4),
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '1140px',

  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'minmax(0, 1fr) auto',
    gap: theme.spacing(8),
  },
}));

export const TextColumn = styled(Box)(() => ({
  minWidth: 0,
}));

export const Eyebrow = styled(BaseText)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  textTransform: 'uppercase',
  letterSpacing: '0.18em',
  color: theme.palette.info.main,
}));

export const SectionTitle = styled(BaseHeading)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  maxWidth: '620px',
  fontSize: '28px',
  lineHeight: '34px',

  [theme.breakpoints.up('md')]: {
    fontSize: '40px',
    lineHeight: '48px',
  },
}));

export const SectionText = styled(BaseText)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  maxWidth: '620px',
  color: 'rgba(250, 250, 250, 0.78)',
}));

export const ImageColumn = styled(Box)(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('lg')]: {
    display: 'block',
  },
}));

export const StyledImage = styled(Image)(() => ({
  height: 'auto',
  maxWidth: '100%',
}));
