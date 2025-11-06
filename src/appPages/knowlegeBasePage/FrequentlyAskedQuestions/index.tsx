import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@/components/Button';
import CardWrapper from '@/components/CardWrapper';
import { Text } from '@/components/Typography';
import { routes } from '@/constants';

const FrequentlyAskedQuestions: FC = () => {
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

export default FrequentlyAskedQuestions;
