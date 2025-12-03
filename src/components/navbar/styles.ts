import { Box, Button as MuiButton, styled } from '@mui/material';

import Link from '@/components/Link';

export const MobileMenuButtonWrapper = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: theme.spacing(1),
  right: theme.spacing(1.5),
  zIndex: 30,

  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

export const StyledMobileMenuButton = styled(MuiButton)(({ theme }) => ({
  borderRadius: '50%',
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(0.5),
  textTransform: 'none',
  boxShadow: 'none',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,

  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    boxShadow: 'none',
  },
}));

export const NavbarContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  boxShadow: '0px 4px 13px 0px rgba(0, 0, 0, 0.15)',
  zIndex: 40,
  display: 'none',
  width: '100px',
  flexDirection: 'column',
  borderTopRightRadius: '2rem',
  borderBottomRightRadius: '2rem',
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5),
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(2),

  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },

  [theme.breakpoints.up('lg')]: {
    width: '230px',
  },
}));

export const LogoLink = styled(Link)(({ theme }) => ({
  marginBottom: theme.spacing(5.5),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& svg': {
    transform: 'scale(1.2)',
  },
}));

export const LinksContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),

  [theme.breakpoints.up('lg')]: {
    gap: theme.spacing(1.5),
  },
}));

export const LanguageSwitcherContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
}));

export const LogoutButton = styled(MuiButton)(({ theme }) => ({
  marginTop: 'auto',
  justifyContent: 'flex-start',
  gap: theme.spacing(0.625),
  border: 'none',
  paddingLeft: theme.spacing(1.25),
  paddingRight: theme.spacing(1.25),
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  textTransform: 'none',
  boxShadow: 'none',
  borderRadius: '50px',
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,
  borderColor: theme.palette.primary.main,

  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    boxShadow: 'none',
  },
}));

export const LogoutButtonText = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('lg')]: {
    display: 'block',
  },
}));

export const Overlay = styled(Box)(() => ({
  position: 'fixed',
  inset: 0,
  zIndex: 30,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  transition: 'opacity 0.3s',
}));

export const MobileMenuContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isOpen',
})<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  backgroundColor: theme.palette.background.default,
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 50,
  display: 'flex',
  height: '100%',
  width: '80%',
  maxWidth: '200px',
  transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
  borderTopRightRadius: '2rem',
  borderBottomRightRadius: '2rem',
  padding: theme.spacing(1.5),
  boxShadow: theme.shadows[8],
  transition: 'transform 0.3s',

  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

export const MobileLogoLink = styled(Link)(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& svg': {
    transform: 'scale(1.2)',
  },
}));

export const MobileLinksContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2.5),
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  gap: theme.spacing(1.5),
}));

export const MobileLanguageSwitcherContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(1.5),
  width: '100%',
}));

export const MobileLogoutContainer = styled(Box)(({ theme }) => ({
  marginTop: 'auto',
  width: '100%',
  paddingTop: theme.spacing(1.5),
}));

export const MobileLogoutButton = styled(MuiButton)(({ theme }) => ({
  width: '100%',
  justifyContent: 'flex-start',
  gap: theme.spacing(0.625),
  border: 'none',
  paddingLeft: theme.spacing(1.25),
  paddingRight: theme.spacing(1.25),
  paddingTop: theme.spacing(0.5),
  paddingBottom: theme.spacing(0.5),
  textTransform: 'none',
  boxShadow: 'none',
  borderRadius: '50px',
  backgroundColor: theme.palette.common.white,
  color: theme.palette.common.black,

  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    boxShadow: 'none',
  },
}));

export const MobileLogoutButtonText = styled(Box)(({ theme }) => ({
  display: 'none',

  [theme.breakpoints.up('md')]: {
    display: 'none',
  },

  [theme.breakpoints.up('lg')]: {
    display: 'block',
  },
}));

export const IconWrapper = styled(Box)(() => ({
  width: '16px',
  height: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  '& svg': {
    width: '16px',
    height: '16px',
  },
}));

export const SpinnerWrapper = styled(Box)(({ theme }) => ({
  margin: '0 auto',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.main,

  '& svg': {
    color: theme.palette.primary.main,
    stroke: theme.palette.primary.main,
  },
}));
