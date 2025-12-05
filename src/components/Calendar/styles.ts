import { Box, styled } from '@mui/material';

import Button from '@/components/Button';

export const StyledDayPicker = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(0.5),
  '--cell-size': theme.spacing(4.3),

  '&[data-slot="card-content"]': {
    backgroundColor: 'transparent',
  },

  '&[data-slot="popover-content"]': {
    backgroundColor: 'transparent',
  },

  '&[dir="rtl"] .rdp-button_next > svg': {
    transform: 'rotate(180deg)',
  },

  '&[dir="rtl"] .rdp-button_previous > svg': {
    transform: 'rotate(180deg)',
  },

  '& .rdp-months': {
    display: 'flex',
    gap: theme.spacing(1),
    flexDirection: 'column',
    position: 'relative',
    [theme.breakpoints.up('md')]: {
      flexDirection: 'row',
    },
  },

  '& .rdp-month': {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    gap: theme.spacing(1),
  },

  '& .rdp-nav': {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(0.25),
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'space-between',
  },

  '& .rdp-button_previous, & .rdp-button_next': {
    width: 'var(--cell-size)',
    height: 'var(--cell-size)',
    padding: 0,
    userSelect: 'none',

    '&[aria-disabled="true"]': {
      opacity: 0.5,
    },
  },

  '& .rdp-month_caption': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'var(--cell-size)',
    width: '100%',
    paddingLeft: 'var(--cell-size)',
    paddingRight: 'var(--cell-size)',
  },

  '& .rdp-dropdowns': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    fontSize: '0.875rem',
    fontWeight: 500,
    justifyContent: 'center',
    height: 'var(--cell-size)',
    gap: theme.spacing(0.375),
  },

  '& .rdp-dropdown_root': {
    position: 'relative',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[1],

    '&:has(:focus)': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 3px ${theme.palette.primary.main}40`,
    },
  },

  '& .rdp-dropdown': {
    position: 'absolute',
    backgroundColor: 'transparent',
    inset: 0,
    opacity: 0,
  },

  '& .rdp-caption_label': {
    userSelect: 'none',
    fontWeight: 500,
    fontSize: '0.875rem',
  },

  '& .rdp-table': {
    width: '100%',
    borderCollapse: 'collapse',
  },

  '& .rdp-weekdays': {
    display: 'flex',
  },

  '& .rdp-weekday': {
    color: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius,
    flex: 1,
    fontWeight: 400,
    fontSize: '0.8rem',
    userSelect: 'none',
  },

  '& .rdp-week': {
    display: 'flex',
    width: '100%',
    marginTop: theme.spacing(0.5),
    gap: theme.spacing(0.25),
  },

  '& .rdp-week_number_header': {
    userSelect: 'none',
    width: 'var(--cell-size)',
  },

  '& .rdp-week_number': {
    fontSize: '0.8rem',
    userSelect: 'none',
    color: theme.palette.text.secondary,
  },

  '& .rdp-day': {
    position: 'relative',
    width: '100%',
    height: '100%',
    padding: 0,
    textAlign: 'center',
    aspectRatio: '1 / 1',
    userSelect: 'none',

    '&:first-of-type[data-selected="true"] button': {
      borderTopLeftRadius: theme.shape.borderRadius,
      borderBottomLeftRadius: theme.shape.borderRadius,
    },

    '&:last-of-type[data-selected="true"] button': {
      borderTopRightRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
    },
  },

  '& .rdp-range_start': {
    borderTopLeftRadius: theme.shape.borderRadius,
    borderBottomLeftRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.secondary.main,
  },

  '& .rdp-range_middle': {
    borderRadius: 0,
  },

  '& .rdp-range_end': {
    borderTopRightRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.secondary.main,
  },

  '& .rdp-today': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    borderRadius: theme.shape.borderRadius,
  },

  '& .rdp-outside': {
    color: theme.palette.text.secondary,

    '&[aria-selected="true"]': {
      color: theme.palette.text.secondary,
    },
  },

  '& .rdp-disabled': {
    color: theme.palette.text.secondary,
    opacity: 0.5,
  },

  '& .rdp-hidden': {
    visibility: 'hidden',
  },
}));

export const StyledRoot = styled(Box)(() => ({
  width: 'fit-content',
}));

export const StyledWeekNumberWrapper = styled(Box)(() => ({
  display: 'flex',
  width: 'var(--cell-size)',
  height: 'var(--cell-size)',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
}));

export const StyledChevron = styled(Box)(({ theme }) => ({
  width: theme.spacing(2),
  height: theme.spacing(2),
}));

export const StyledCalendarDayButton = styled(Button, {
  shouldForwardProp: (prop) =>
    prop !== 'data-selected-single' &&
    prop !== 'data-range-start' &&
    prop !== 'data-range-end' &&
    prop !== 'data-range-middle',
})(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  aspectRatio: '1 / 1',
  width: '100%',
  minWidth: 'var(--cell-size)',
  cursor: 'pointer',
  gap: theme.spacing(0.25),
  padding: 0,
  lineHeight: 'normal',
  fontWeight: 400,

  '& > span': {
    fontSize: '0.75rem',
    opacity: 0.7,
  },

  '&[data-selected-single="true"]': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },

  '&[data-range-start="true"]': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: theme.shape.borderRadius,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  '&[data-range-end="true"]': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: theme.shape.borderRadius,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },

  '&[data-range-middle="true"]': {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    borderRadius: 0,
  },

  '.group[data-focused="true"]/day &': {
    position: 'relative',
    zIndex: 10,
    border: `1px solid ${theme.palette.primary.main}`,
    boxShadow: `0 0 0 3px ${theme.palette.primary.main}40`,
  },
}));
