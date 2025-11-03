'use client';

import { CardWrapper } from '@/shared/components/cardWrapper';
import { Heading } from '@/shared/ui/typography';
import { PersonalDataForm } from './personalDataForm';
import { useTranslation } from 'react-i18next';

export const PersonalData = () => {
  const { t } = useTranslation();

  return (
    <CardWrapper className="h-fit max-w-full">
      <Heading variant="xl" className="mb-4">
        {t('PROFILE.PERSONAL_DATA')}
      </Heading>
      <hr className="mb-8" />
      <PersonalDataForm />
    </CardWrapper>
  );
};
