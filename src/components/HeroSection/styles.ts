import { styled } from '@mui/material';

import SectionContent from '@/components/SectionContent';

export const StyledHeroSection = styled(SectionContent)(({ theme }) => ({
  color: theme.palette.common.white,
  backgroundColor: theme.palette.common.black,
}));
