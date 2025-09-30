'use client'
import Image from 'next/image';
import React from 'react';
import { CardWrapper } from '@/shared/components/card-wrapper';
import { DotTitle } from '@/shared/ui/dotTitle';
import { Text } from '@/shared/ui/typography';
import { ProgressBar } from '@/shared/ui/progress';
import { Button } from '@/shared/ui/button';

type ProgressCardProps = {
  title: string;
  subTitle: string;
  totalModules?: number;
  modules?: number;
  totalLessons: number;
  lessons: number;
  status?: 'Продолжить' | 'Начать';
  image?: string;
  onClick?: () => void;
};

export const ProgressCard = ({
  title,
  subTitle,
  totalModules,
  totalLessons,
  lessons,
  status,
  modules,
  image,
  onClick,
}: ProgressCardProps) => {
  const hasModules = totalModules !== undefined && modules !== undefined;

  const progressValue = (lessons / totalLessons) !== 0 ? (lessons / totalLessons)*100 : 1;

  return (
    <CardWrapper>
      <div className="flex h-[70px] items-stretch gap-4 relative">
        {image && <Image
          width={49}
          height={58}
          className="my-auto max-h-[58px]" 
          src={image} 
          alt="rocket" 
        />}

        <div className="flex flex-1 flex-col justify-between">
          <DotTitle
            firstLabel={title}
            secondLabel={subTitle}
            secondClassName="text-soft"
            dotClassName="bg-soft"
          />
          <div className="space-y-2">
            <div className="flex gap-2">
              {hasModules && (
                <Text className="text-[10px]">
                  Модулей: {modules}/{totalModules}
                </Text>
              )}
              <Text className="text-[10px]">
                Уроков: {lessons}/{totalLessons}
              </Text>
            </div>
            <ProgressBar className='h-1' value={progressValue} />
          </div>
        </div>

        {status && (
          <Button
            className="absolute top-0 right-0"
            size="small"
            onClick={onClick}
          >
            {status}
          </Button>
        )}
      </div>
    </CardWrapper>
  );
};
