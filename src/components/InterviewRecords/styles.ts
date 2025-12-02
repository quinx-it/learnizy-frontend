import { Box, Divider as MuiDivider, styled } from '@mui/material';

import Link from '@/components/Link';
import { Text as BaseText } from '@/components/Typography';

export const StyledCardWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
}));

export const Title = styled(BaseText)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

export const StyledDivider = styled(MuiDivider)(({ theme }) => ({
  borderColor: theme.palette.grey[400],
  margin: 0,
  marginBottom: theme.spacing(1.5),
  padding: 0,
}));

export const DescriptionText = styled(BaseText)(({ theme }) => ({
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

export const StyledLinkButton = styled(Link)(({ theme }) => ({
  textTransform: 'none',
  boxShadow: 'none',
  borderRadius: '50px',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  paddingLeft: theme.spacing(1.25),
  paddingRight: theme.spacing(1.25),
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  fontSize: '14px',
  lineHeight: '18px',
  width: 'fit-content',
  position: 'relative',
  overflow: 'hidden',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  textDecoration: 'none',
  transition: 'background-color 0.2s ease-in-out',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: 'none',
    color: theme.palette.common.white,
    textDecoration: 'none',
  },
  '&:disabled': {
    backgroundColor: theme.palette.info.main,
    color: theme.palette.common.white,
  },
}));
