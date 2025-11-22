'use client';

import { FC } from 'react';

import SecuritySettingsForm from '@/components/SecuritySettingsForm';
import { Heading } from '@/components/Typography';

import { Container, Divider, HeadingWrapper } from './styles';

const SecuritySettings: FC = () => {
  return (
    <Container>
      <HeadingWrapper>
        <Heading variant="xl">Настройки безопасности</Heading>
      </HeadingWrapper>
      <Divider />
      <SecuritySettingsForm />
    </Container>
  );
};

export default SecuritySettings;
