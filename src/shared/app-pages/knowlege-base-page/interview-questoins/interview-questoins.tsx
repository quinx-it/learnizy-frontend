import { CardWrapper } from '@/shared/components/card-wrapper'
import { routes } from '@/shared/constants';
import { Button } from '@/shared/ui/button';
import { Text } from '@/shared/ui/typography';
import Link from 'next/link';
import React from 'react'

export const InterviewQuestions = () => {
  return (
    <CardWrapper className="flex flex-col gap-4">
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
      </CardWrapper>
  )
}