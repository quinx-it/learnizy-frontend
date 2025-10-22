'use client';

import React, { FC } from 'react';
import { cn } from '@/shared/lib/utils';
import { Heading } from '@/shared/ui/typography';
import Image from 'next/image';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { useAppSelector } from '@/shared/hooks/redux';
import { selectUserRole } from '@/store/slices/auth/selectors';
import { defaultPage, routes } from '@/shared/constants';

type NotFoundComponentPropsType = {
  className?: string;
};

export const NotFoundComponent: FC<NotFoundComponentPropsType> = (props) => {
  const { className } = props;

  const role = useAppSelector(selectUserRole);

  const defaultUrl = role && defaultPage[role] ? defaultPage[role] : routes.public.loginPage;

  return (
    <div className={cn('text-deep relative mx-auto flex flex-col p-4 text-center', className)}>
      <Heading className="leading-auto text-[200px] text-[#CCEDF6] md:text-[300px] md:leading-[270px]">
        404
      </Heading>
      <Heading variant={'2xl'} className="text-medium mt-5">
        Not found
      </Heading>
      <Image
        width={192}
        height={207}
        src="/images/notfound-astronaut.webp"
        alt="astronaut"
        className="absolute right-1/5 bottom-2/7 max-w-[132px] translate-x-1/5 transform md:max-w-[192px]"
      />
      <Button className="mx-auto mt-8 max-w-[141px]" size={'medium'} asChild>
        <Link href={defaultUrl}>На главную</Link>
      </Button>
    </div>
  );
};
