import { CardWrapper } from '@/shared/components/card-wrapper';
import { routes } from '@/shared/constants';
import { Button } from '@/shared/ui/button';
import { Text } from '@/shared/ui/typography';
import Link from 'next/link';
import Image from 'next/image';

export const FrequentlyAskedQuestions = () => {
  return (
    <CardWrapper className="flex flex-col gap-4 relative overflow-hidden">
      <Text variant="m" className="text-medium">
        Ответы на популярные вопросы
      </Text>
      <hr />
      <div>
        <Text variant="m" className="mb-2">
          Всё, что вы хотели спросить — уже собрано в одном месте. Как проходит обучение, где найти
          домашку, как получить сертификат и многое другое.
        </Text>
        <Text variant="s" className="text-medium w-3/4">
          Перейдите в раздел, чтобы найти нужную информацию или быстро разобраться в непонятном.
        </Text>
      </div>

      <Button variant="blue" size="small" asChild className="w-fit">
        <Link href={routes.frequentlyAskedQuestions}>Смотреть ответы</Link>
      </Button>

      <Image src='/images/blue-planet-with-moon.webp' alt='' className='absolute bottom-0 right-0 translate-x-15 translate-y-7 rotate-6' width={160} height={107} />
    </CardWrapper>
  );
};
