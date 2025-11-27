import { Box, Typography, styled } from '@mui/material';

export const StyledCardWrapper = styled(Box)(() => ({
  maxWidth: '100%',
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  lineHeight: '22px',
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1.25),
}));

export const Divider = styled('hr')(({ theme }) => ({
  borderColor: theme.palette.grey[500],
  borderWidth: '1px',
  borderStyle: 'solid',
  marginBottom: theme.spacing(1),
  marginTop: 0,
  padding: 0,
}));

export const AccordionContainer = styled(Box)(() => ({
  width: '100%',
}));
