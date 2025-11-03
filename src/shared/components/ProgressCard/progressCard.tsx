'use client';
import Image from 'next/image';
import React, { FC } from 'react';
import { CardWrapper } from '@/shared/components/CardWrapper';
import { DotTitle } from '@/shared/ui/dotTitle';
import { Text } from '@/shared/ui/typography';
import { ProgressBar } from '@/shared/ui/progress';
import { Button } from '@/shared/ui/button';
import { ProgressCardPropsType } from './typings';
import { useTranslation } from 'react-i18next';

export const ProgressCard: FC<ProgressCardPropsType> = (props) => {
  const { title, subTitle, totalModules, totalLessons, lessons, status, modules, image, onClick } =
    props;

  const { t } = useTranslation();

  const hasModules = totalModules !== undefined && modules !== undefined;

  const progressValue = lessons / totalLessons !== 0 ? (lessons / totalLessons) * 100 : 1;

  return (
    <CardWrapper>
      <div className="relative flex h-auto items-stretch gap-4">
        {image && (
          <Image width={49} height={58} className="my-auto max-h-[58px]" src={image} alt="rocket" />
        )}

        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <DotTitle
            className="mr-[150px] max-w-[370px]"
            firstLabel={title}
            secondLabel={subTitle}
            secondClassName="text-soft"
            dotClassName="bg-soft"
          />
          <div className="space-y-2">
            <div className="flex gap-2">
              {hasModules && (
                <Text className="text-[10px]">
                  {t('PROGRESS_CARD.MODULES_LABEL')}: {modules}/{totalModules}
                </Text>
              )}
              <Text className="text-[10px]">
                {t('PROGRESS_CARD.LESSONS_LABEL')}: {lessons}/{totalLessons}
              </Text>
            </div>
            <ProgressBar className="h-1 w-full" value={progressValue} />
          </div>
        </div>

        {status && (
          <Button className="absolute top-0 right-0" size="small" onClick={onClick}>
            {status}
          </Button>
        )}
      </div>
    </CardWrapper>
  );
};
