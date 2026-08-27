import { Box, styled } from '@mui/material';
import Image from 'next/image';

import SectionContent from '@/components/SectionContent';
import { Heading as BaseHeading } from '@/components/Typography';

import { CardType } from './const';

export const StyledSectionContent = styled(SectionContent)(({ theme }) => ({
  backgroundColor: theme.palette.info.main,
}));

export const SectionWrapper = styled(Box)(() => ({
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '1140px',
}));

export const HeaderContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  marginBottom: theme.spacing(6),

  [theme.breakpoints.up('xl')]: {
    marginBottom: theme.spacing(12),
  },
}));

export const StyledHeading7xl = styled(BaseHeading)(({ theme }) => ({
  marginBottom: '8px',
  fontSize: '36px',
  lineHeight: '42px',

  [theme.breakpoints.up('md')]: {
    fontSize: '52px',
    lineHeight: '71px',
  },
}));

export const StyledHeadingDescription = styled(BaseHeading)(() => ({
  maxWidth: '750px',
}));

export const CardsGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(1.5),
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '100%',

  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
}));

export const StyledCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'cardType',
})<{ cardType: CardType }>(({ theme, cardType }) => ({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  maxWidth: '558px',

  [theme.breakpoints.up('md')]: {
    aspectRatio: '1 / 1',
  },
  overflow: 'hidden',
  borderRadius: '24px',
  padding: theme.spacing(4),
  backgroundColor:
    cardType === CardType.Dark ? theme.palette.primary.main : theme.palette.background.paper,
  color:
    cardType === CardType.Dark ? theme.palette.primary.contrastText : theme.palette.primary.main,
}));

export const CardContent = styled(Box)(() => ({}));

export const StyledCardHeading = styled(BaseHeading)(({ theme }) => ({
  marginBottom: '12px',
  fontSize: '28px',
  lineHeight: '34px',

  [theme.breakpoints.up('md')]: {
    fontSize: '40px',
    lineHeight: '55px',
  },
}));

export const ImageWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  display: 'flex',
  justifyContent: 'center',
}));

export const StyledImage = styled(Image)(({ theme }) => ({
  position: 'absolute',
  right: '-10%',
  bottom: '-10%',
  width: '50%',
  maxWidth: '305px',
  transform: 'scaleX(-1)',

  [theme.breakpoints.up('xl')]: {
    width: '100%',
  },
}));
