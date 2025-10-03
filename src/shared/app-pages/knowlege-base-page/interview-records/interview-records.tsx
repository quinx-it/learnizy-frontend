import { CardWrapper } from '@/shared/components/card-wrapper';
import { routes } from '@/shared/constants';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/button';
import { Text } from '@/shared/ui/typography';
import Link from 'next/link';

interface InterviewRecordsProps {
  className?: string;
}

export const InterviewRecords = ({ className }: InterviewRecordsProps) => {
  return (
    <CardWrapper className={cn(className, 'flex flex-col gap-4')}>
      <Text variant="m" className="text-medium">
        Записи собеседований
      </Text>

      <hr />

      <Text variant="m" className="mb-2">
        В этом разделе — записи интервью с выпускниками: от джунов до мидлов. Полезный опыт, живые
        ответы, реальные вопросы.
      </Text>

      <Button variant="blue" size="small" asChild className="w-fit">
        <Link href={routes.user.interviewRecords}>Смотреть все записи</Link>
      </Button>
    </CardWrapper>
  );
};
