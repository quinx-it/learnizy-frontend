'use client';

import { FC } from 'react';

import PersonalDataForm from '@/components/PersonalDataForm';
import { useTranslation } from '@/hooks';

import { StyledCardWrapper, StyledDivider, StyledHeading } from './styles';

const PersonalData: FC = () => {
  const { t } = useTranslation();

  return (
    <StyledCardWrapper>
      <StyledHeading variant="xl">{t('PROFILE.PERSONAL_DATA')}</StyledHeading>
      <StyledDivider />
      <PersonalDataForm />
    </StyledCardWrapper>
  );
};

export default PersonalData;
