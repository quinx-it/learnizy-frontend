import { Box, styled } from '@mui/material';

import SectionContent from '@/components/SectionContent';
import { Heading as BaseHeading, Text as BaseText } from '@/components/Typography';

export const StyledHeroSection = styled(SectionContent)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  color: theme.palette.common.white,
  backgroundColor: theme.palette.common.black,


  '&::before': {
    content: '""',
    position: 'absolute',
    top: '-30%',
    left: '-10%',
    width: '60%',
    paddingBottom: '60%',
    borderRadius: '50%',
    background: `radial-gradient(circle, ${theme.palette.primary.main} 0%, transparent 70%)`,
    opacity: 0.22,
    pointerEvents: 'none',
  },
}));

export const Layout = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(6),
  alignItems: 'center',
  marginLeft: 'auto',
  marginRight: 'auto',
  maxWidth: '1140px',

  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 0.9fr)',
    gap: theme.spacing(8),
  },
}));

export const Intro = styled(Box)(() => ({
  minWidth: 0,
}));

export const Eyebrow = styled(BaseText)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  textTransform: 'uppercase',
  letterSpacing: '0.18em',
  color: theme.palette.info.main,
}));

export const Title = styled(BaseHeading)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  fontSize: '40px',
  lineHeight: '46px',

  [theme.breakpoints.up('md')]: {
    fontSize: '52px',
    lineHeight: '58px',
  },
}));

export const Description = styled(BaseText)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  maxWidth: '560px',
  color: 'rgba(250, 250, 250, 0.78)',
}));

export const Actions = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

export const Note = styled(BaseText)(() => ({
  maxWidth: '420px',
  color: 'rgba(250, 250, 250, 0.55)',
}));

export const Panel = styled(Box)(({ theme }) => ({
  minWidth: 0,
  borderRadius: '24px',
  border: '1px solid rgba(169, 219, 233, 0.22)',
  backgroundColor: 'rgba(250, 250, 250, 0.05)',
  padding: theme.spacing(3),

  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  },
}));

export const PanelHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  gap: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  marginBottom: theme.spacing(3),
  borderBottom: '1px solid rgba(169, 219, 233, 0.18)',
}));

export const PanelLabel = styled(BaseText)(({ theme }) => ({
  color: theme.palette.info.main,
}));

export const PanelRole = styled(BaseText)(() => ({
  color: 'rgba(250, 250, 250, 0.55)',
}));

export const BlockLabel = styled(BaseText)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  textTransform: 'uppercase',
  letterSpacing: '0.14em',
  color: 'rgba(250, 250, 250, 0.45)',
}));

export const Question = styled(BaseText)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: theme.palette.common.white,
}));

export const Answer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  paddingLeft: theme.spacing(2),
  borderLeft: `2px solid ${theme.palette.primary.main}`,
}));

export const AnswerText = styled(BaseText)(() => ({
  color: 'rgba(250, 250, 250, 0.8)',
}));

export const Review = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  gap: theme.spacing(2),
  borderRadius: '16px',
  backgroundColor: 'rgba(35, 139, 167, 0.22)',
  padding: theme.spacing(2),
}));

export const ReviewBody = styled(Box)(() => ({
  flex: '1 1 200px',
  minWidth: 0,
}));

export const ReviewText = styled(BaseText)(() => ({
  color: 'rgba(250, 250, 250, 0.9)',
}));

export const Score = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'baseline',
  gap: '4px',
}));

export const ScoreValue = styled(BaseHeading)(({ theme }) => ({
  color: theme.palette.secondary.main,
}));

export const ScoreLabel = styled(BaseText)(() => ({
  color: 'rgba(250, 250, 250, 0.55)',
}));
