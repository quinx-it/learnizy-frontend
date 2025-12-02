import { Box, Button, styled, Typography } from '@mui/material';
import Image from 'next/image';

export const Container = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  height: 'auto',
  alignItems: 'stretch',
  gap: theme.spacing(1),
}));

export const StyledImage = styled(Image)(() => ({
  marginTop: 'auto',
  marginBottom: 'auto',
  maxHeight: '58px',
}));

export const ContentWrapper = styled(Box)(() => ({
  display: 'flex',
  minWidth: 0,
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

export const DotTitleWrapper = styled(Box)(({ theme }) => ({
  marginRight: '150px',
  maxWidth: '370px',

  '& [class*="StyledText"], & [class*="StyledHeading"]': {
    color: `${theme.palette.common.black} !important`,
  },

  '& [class*="SecondLabel"], & [class*="SecondLabel"] *': {
    color: `${theme.palette.primary.main} !important`,
  },

  '& [class*="Dot"]': {
    backgroundColor: `${theme.palette.primary.main} !important`,
  },
}));

export const StatsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
}));

export const StatsRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(0.5),
}));

export const StyledText = styled(Typography)(({ theme }) => ({
  fontSize: '10px',
  lineHeight: '14px',
  color: theme.palette.text.primary,
}));

export const ProgressBarWrapper = styled(Box)(() => ({
  width: '100%',
  '& > *': {
    height: '4px !important',
  },
}));

export const StatusButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: `${theme.palette.common.white} !important`,
  textTransform: 'none',
  boxShadow: 'none',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    color: `${theme.palette.common.white} !important`,
    boxShadow: 'none',
  },
  '& *': {
    color: `${theme.palette.common.white} !important`,
    textTransform: 'none',
  },
}));
