import { keyframes, styled } from '@mui/material';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const zoomIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const zoomOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.95);
  }
`;

const slideInFromTop = keyframes`
  from {
    transform: translateY(-4px);
  }
  to {
    transform: translateY(0);
  }
`;

const slideInFromRight = keyframes`
  from {
    transform: translateX(4px);
  }
  to {
    transform: translateX(0);
  }
`;

const slideInFromLeft = keyframes`
  from {
    transform: translateX(-4px);
  }
  to {
    transform: translateX(0);
  }
`;

const slideInFromBottom = keyframes`
  from {
    transform: translateY(4px);
  }
  to {
    transform: translateY(0);
  }
`;

export const StyledContent = styled(TooltipPrimitive.Content)(({ theme }) => ({
  zIndex: 50,
  width: 'fit-content',
  borderRadius: '2px',
  paddingLeft: theme.spacing(1.5),
  paddingRight: theme.spacing(1.5),
  paddingTop: theme.spacing(0.75),
  paddingBottom: theme.spacing(0.75),
  fontSize: '12px',
  textAlign: 'left',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.primary.main,
  boxShadow: theme.shadows[4],
  animation: `${fadeIn} 0.15s ease-out, ${zoomIn} 0.15s ease-out`,
  transformOrigin: 'var(--radix-tooltip-content-transform-origin)',

  '&[data-state="closed"]': {
    animation: `${fadeOut} 0.15s ease-in, ${zoomOut} 0.15s ease-in`,
  },

  '&[data-side="bottom"]': {
    animation: `${fadeIn} 0.15s ease-out, ${zoomIn} 0.15s ease-out, ${slideInFromTop} 0.15s ease-out`,

    '&[data-state="closed"]': {
      animation: `${fadeOut} 0.15s ease-in, ${zoomOut} 0.15s ease-in`,
    },
  },

  '&[data-side="left"]': {
    animation: `${fadeIn} 0.15s ease-out, ${zoomIn} 0.15s ease-out, ${slideInFromRight} 0.15s ease-out`,

    '&[data-state="closed"]': {
      animation: `${fadeOut} 0.15s ease-in, ${zoomOut} 0.15s ease-in`,
    },
  },

  '&[data-side="right"]': {
    animation: `${fadeIn} 0.15s ease-out, ${zoomIn} 0.15s ease-out, ${slideInFromLeft} 0.15s ease-out`,

    '&[data-state="closed"]': {
      animation: `${fadeOut} 0.15s ease-in, ${zoomOut} 0.15s ease-in`,
    },
  },

  '&[data-side="top"]': {
    animation: `${fadeIn} 0.15s ease-out, ${zoomIn} 0.15s ease-out, ${slideInFromBottom} 0.15s ease-out`,

    '&[data-state="closed"]': {
      animation: `${fadeOut} 0.15s ease-in, ${zoomOut} 0.15s ease-in`,
    },
  },
}));

export const StyledArrow = styled(TooltipPrimitive.Arrow)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  fill: theme.palette.background.default,
  zIndex: 50,
  width: theme.spacing(1.25),
  height: theme.spacing(1.25),
  transform: 'translateY(calc(-50% - 2px)) rotate(45deg)',
  borderRadius: '2px',
}));
