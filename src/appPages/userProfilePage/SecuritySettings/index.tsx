import { FC } from 'react';

import { CardWrapper } from '@/components/CardWrapper';
import { Heading } from '@/components/Typography';

import SecuritySettingsForm from './SecuritySettingsForm';

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
