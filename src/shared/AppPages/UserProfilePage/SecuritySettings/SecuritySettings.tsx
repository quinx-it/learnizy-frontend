import { CardWrapper } from '@/shared/components/CardWrapper';
import { Heading } from '@/shared/ui/typography';
import { SecuritySettingsForm } from './SecuritySettingsForm';

export const SecuritySettings = () => {
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
