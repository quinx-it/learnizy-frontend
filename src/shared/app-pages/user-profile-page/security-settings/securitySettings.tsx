import { CardWrapper } from '@/shared/components/card-wrapper';
import { Heading } from '@/shared/ui/typography';
import { SecuritySettingsForm } from './security-settings-form';

export const SecuritySettings = () => {
  return (
    <CardWrapper className="max-w-full">
      <Heading variant="xl" className="mb-4">
        Настройки безопасности
      </Heading>
      <hr className="mb-8" />
      <SecuritySettingsForm />
    </CardWrapper>
  );
};
