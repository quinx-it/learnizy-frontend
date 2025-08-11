import { CardWrapper } from '@/shared/components/card-wrapper';
import { Heading } from '@/shared/ui/typography';

export const PersonalData = () => {
  return (
    <CardWrapper className="max-w-full">
      <Heading variant="xl" className="mb-4">
        Персональные данные
      </Heading>
      <hr className="mb-8" />
    </CardWrapper>
  );
};
