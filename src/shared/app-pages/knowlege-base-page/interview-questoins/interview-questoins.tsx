import { CardWrapper } from '@/shared/components/card-wrapper'
import { routes } from '@/shared/constants';
import { Button } from '@/shared/ui/button';
import { Text } from '@/shared/ui/typography';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react'

export const InterviewQuestions = () => {
  return (
    <CardWrapper className="flex flex-col gap-4 relative overflow-hidden">
        <Text variant="m" className="text-medium">
          Вопросы для собеседования
        </Text>
        <hr />
        <div>
          <Text variant="m" className='mb-2'>
            Подготовьтесь к интервью заранее — мы собрали самые частые и важные вопросы, которые
            задают начинающим и опытным специалистам.
          </Text>
          <Text variant="s" className="text-medium w-3/4">
            Перейдите в раздел, чтобы попрактиковаться и почувствовать себя увереннее на реальном
            собеседовании.
          </Text>
        </div>

        <Button variant="blue" size="small" asChild className='w-fit'>
          <Link href={routes.interviewQuestions}>Перейти к вопросам</Link>
        </Button>

        <Image src='/images/planet-with-disc-blue.webp' alt='' className='absolute bottom-0 right-0 translate-x-12 translate-y-4' width={176} height={88} />
      </CardWrapper>
  )
}