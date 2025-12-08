'use client';

import { FC } from 'react';

import SecuritySettingsForm from '@/components/SecuritySettingsForm';
import { Heading } from '@/components/Typography';
import { useTranslation } from '@/hooks';

import { Container, Divider, HeadingWrapper } from './styles';

const SecuritySettings: FC = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <HeadingWrapper>
        <Heading variant="xl">{t('SECURITY_SETTINGS.TITLE')}</Heading>
      </HeadingWrapper>
      <Divider />
      <SecuritySettingsForm />
    </Container>
  );
};

export default SecuritySettings;
