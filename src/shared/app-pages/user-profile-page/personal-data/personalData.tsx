import { CardWrapper } from '@/shared/components/card-wrapper';
import { Heading } from '@/shared/ui/typography';
import { PersonalDataForm } from './personal-data-form';

export const PersonalData = () => {
  return (
    <CardWrapper className="max-w-full">
      <Heading variant="xl" className="mb-4">
        Персональные данные
      </Heading>
      <hr className="mb-8" />
      <PersonalDataForm />
    </CardWrapper>
  );
};
