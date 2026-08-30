import { Box, Button, styled } from '@mui/material';

import { Heading as BaseHeading } from '@/components/Typography';

export const StyledCardWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'blocked',
})<{ active: boolean; blocked: boolean }>(({ theme, active, blocked }) => {
  const getBorderColor = () => {
    if (blocked) return theme.palette.grey[400];

    if (active) return theme.palette.primary.main;

    return theme.palette.info.main;
  };
  const borderColor = getBorderColor();
  const borderWidth = active ? '2px' : '1px';

  return {
    position: 'relative',
    width: '100%',
    padding: theme.spacing(3),
    borderRadius: '1rem',
    backgroundColor: theme.palette.background.default,
    boxShadow: active
      ? '0px 10px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)'
      : '0px 4px 13px 0px rgba(0, 0, 0, 0.15)',
    cursor: 'pointer',
    border: `${borderWidth} solid ${borderColor}`,
  };
});

export const CardContent = styled(Box)(() => ({
  alignItems: 'flex-start',
  gap: '12px',
  display: 'flex',
}));

export const LeftContent = styled(Box)(({ theme }) => ({
  minWidth: 0,
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
}));

export const RightContent = styled(Box)(() => ({
  flexShrink: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  justifyContent: 'space-between',
}));

export const StyledHeading = styled(BaseHeading)(() => ({
  wordBreak: 'break-word',
}));

export const TitleSpan = styled('span', {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'blocked',
})<{ active: boolean; blocked: boolean }>(({ theme, active, blocked }) => {
  const getColor = () => {
    if (blocked) return theme.palette.grey[400];

    if (active) return theme.palette.primary.main;

    return theme.palette.info.main;
  };

  return {
    color: getColor(),
  };
});

export const TaskList = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(0.5),
  paddingLeft: theme.spacing(0.2),
  wordBreak: 'break-word',
}));

export const TaskListItem = styled(Box)(({ theme }) => ({
  color: theme.palette.common.black,
  marginBottom: theme.spacing(0.25),
  wordBreak: 'break-word',
  position: 'relative',
  paddingLeft: theme.spacing(2.5),

  '&::before': {
    content: '"•"',
    position: 'absolute',
    left: 0,
    color: theme.palette.primary.main,
    fontSize: '1.2em',
    lineHeight: '1',
  },
}));

export const RatingContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.25),
  alignSelf: 'flex-end',
}));

export const RatingHeading = styled(BaseHeading, {
  shouldForwardProp: (prop) => prop !== 'blocked',
})<{ blocked: boolean }>(({ theme, blocked }) => ({
  color: blocked ? theme.palette.grey[400] : theme.palette.primary.main,
}));

export const StyledButton = styled(Button, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive: boolean }>(({ theme, isActive }) => ({
  textTransform: 'none',
  boxShadow: 'none',
  borderRadius: '50px',
  backgroundColor: isActive ? theme.palette.primary.main : theme.palette.common.white,
  color: isActive ? theme.palette.common.white : theme.palette.common.black,
  border: isActive ? 'none' : `1px solid ${theme.palette.primary.main}`,
  paddingLeft: isActive ? theme.spacing(2.5) : theme.spacing(1.5),
  paddingRight: isActive ? theme.spacing(2.5) : theme.spacing(1.5),
  paddingTop: isActive ? theme.spacing(1) : theme.spacing(0.5),
  paddingBottom: isActive ? theme.spacing(1) : theme.spacing(0.5),
  fontSize: isActive ? '16px' : '12px',
  lineHeight: isActive ? '22px' : '16px',
  pointerEvents: isActive ? 'auto' : 'none',

  '&:hover': {
    backgroundColor: isActive ? theme.palette.primary.dark : theme.palette.primary.main,
    color: theme.palette.common.white,
    boxShadow: 'none',
  },
}));
