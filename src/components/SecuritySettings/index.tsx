import { FC } from 'react';

import CardWrapper from '@/components/CardWrapper';
import SecuritySettingsForm from '@/components/SecuritySettingsForm';
import { Heading } from '@/components/Typography';

const SecuritySettings: FC = () => {
  return (
    <CardWrapper className="h-fit max-w-full">
      <Heading variant="xl" className="mb-4">
        Настройки безопасности
      </Heading>
      <hr className="mb-8" />
      <SecuritySettingsForm />
    </CardWrapper>
  );
};

export default SecuritySettings;
