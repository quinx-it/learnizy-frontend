import { styled } from '@mui/material';

import Link from '@/components/Link';
import { Text as BaseText, Heading as BaseHeading } from '@/components/Typography';

import {
  Container as DotTitleContainer,
  SecondLabel as DotTitleSecondLabel,
} from '@/components/DotTitle/styles';

export const StyledNav = styled('nav')(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

export const StyledList = styled('ul')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  color: theme.palette.primary.main,
}));

export const StyledListItem = styled('li')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
}));

export const StyledRootLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== 'hasItems',
})<{ hasItems?: boolean }>(({ theme, hasItems }) => ({
  color: hasItems ? theme.palette.info.main : theme.palette.primary.main,
  transition: 'color 0.2s ease-in-out',

  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.info.main,
  transition: 'color 0.2s ease-in-out',

  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

export const StyledText = styled(BaseText)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const StyledDotTitleContainer = styled(DotTitleContainer)(({ theme }) => ({
  gap: theme.spacing(0.625),
}));

export const StyledDotTitleHeading = styled(BaseHeading)(({ theme }) => ({
  color: theme.palette.text.primary,
  minWidth: 'fit-content',
}));

export const StyledDotTitleSecondLabel = styled(DotTitleSecondLabel)(({ theme }) => ({
  color: theme.palette.info.main,
  fontWeight: 500,
  display: 'inline',
}));

export const StyledDotTitleDot = styled('span')(() => ({
  lineHeight: 'inherit',
  backgroundColor: 'transparent',
  paddingLeft: '0.25rem',
  paddingRight: '0.25rem',
  fontSize: '22px',
  display: 'inline',
}));
