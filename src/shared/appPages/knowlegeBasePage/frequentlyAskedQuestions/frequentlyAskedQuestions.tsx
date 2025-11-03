import { CardWrapper } from '@/shared/components/CardWrapper';
import { routes } from '@/shared/constants';
import { Button } from '@/shared/ui/button';
import { Text } from '@/shared/ui/typography';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export const FrequentlyAskedQuestions = () => {
  const { t } = useTranslation();

  return (
    <CardWrapper className="relative flex flex-col gap-4 overflow-hidden">
      <Text variant="m" className="text-medium">
        {t('FAQ.TITLE')}
      </Text>
      <hr />
      <div>
        <Text variant="m" className="mb-2">
          {t('FAQ.DESCRIPTION_1')}
        </Text>
        <Text variant="s" className="text-medium w-3/4">
          {t('FAQ.DESCRIPTION_2')}
        </Text>
      </div>

      <Button variant="blue" size="small" asChild className="w-fit">
        <Link href={routes.user.frequentlyAskedQuestions}>{t('FAQ.BUTTON')}</Link>
      </Button>

      <Image
        src="/images/blue-planet-with-moon.webp"
        alt=""
        className="absolute right-0 bottom-0 translate-x-15 translate-y-7 rotate-6"
        width={160}
        height={107}
      />
    </CardWrapper>
  );
};
