import { Box, styled } from '@mui/material';

import SectionContent from '@/components/SectionContent';
import { Heading as BaseHeading } from '@/components/Typography';

import { CardType } from './constants';

export const StyledSectionContent = styled(SectionContent)(() => ({
  backgroundColor: '#B7E3F0',
}));

export const SectionWrapper = styled(Box)(({ theme }) => ({
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '1140px',
  paddingLeft: theme.spacing(1),
}));

export const HeaderContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  paddingLeft: theme.spacing(4),
  paddingRight: theme.spacing(4),
}));

export const StyledHeading7xl = styled(BaseHeading)(() => ({
  marginBottom: '8px',
}));

export const StyledHeadingDescription = styled(BaseHeading)(() => ({
  marginBottom: '120px',
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
  aspectRatio: '1 / 1',
  maxWidth: '558px',
  overflow: 'hidden',
  borderRadius: '24px',
  padding: theme.spacing(4),
  backgroundColor:
    cardType === CardType.Dark ? theme.palette.primary.main : theme.palette.background.paper,
  color:
    cardType === CardType.Dark ? theme.palette.primary.contrastText : theme.palette.primary.main,
}));

export const CardContent = styled(Box)(() => ({}));

export const StyledCardHeading = styled(BaseHeading)(() => ({
  marginBottom: '12px',
}));

export const ImageWrapper = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  display: 'flex',
  justifyContent: 'center',
}));
