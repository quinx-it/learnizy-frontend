'use client';

import Link from 'next/link';
import { Fragment } from 'react';
import { DotTitle } from '../dotTitle';
import { ArrowRightIcon } from '@/shared/ui/icons';
import { Text } from '@/shared/ui/typography';
import { cn } from '@/shared/lib/utils';
import { constants } from './constants';

type BreadcrumbItem = {
  label: string;
  href: string;
};

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
  rootLabel?: string;
  rootHref?: string;
  rootDescription?: string;
}

export const Breadcrumbs = ({
  items,
  rootLabel = constants.rootLabel,
  rootHref = constants.rootHref,
  className,
  rootDescription,
}: BreadcrumbsProps) => {
  return (
    <nav className={cn('mb-4', className)}>
      <ul className="text-medium flex flex-wrap items-center gap-2">
        {items ? (
          <>
            <li>
              <Link
                href={rootHref}
                className={cn('hover:text-medium', { 'text-soft hover:text-medium': items })}
              >
                <Text variant={'l'}> {rootLabel}</Text>
              </Link>
            </li>
            {items.map((crumb, index) => (
              <Fragment key={crumb.href}>
                <li className="flex items-center gap-2">
                  <ArrowRightIcon color="blue" className="size-2.5" />
                  {index === items.length - 1 ? (
                    <Text variant={'l'} className="text-medium">
                      {crumb.label}
                    </Text>
                  ) : (
                    <Link href={crumb.href}>
                      <Text variant={'l'} className="text-soft hover:text-medium">
                        {crumb.label}
                      </Text>
                    </Link>
                  )}
                </li>
              </Fragment>
            ))}
          </>
        ) : (
          <li>
            <DotTitle
              heading
              className="gap-2.5"
              firstVariant="l"
              secondVariant="l"
              dotClassName="size-1.5 bg-soft self-center !m-0 min-w-[6px] min-h-[6px] max-w-[6px] max-h-[6px]"
              secondClassName="text-soft"
              firstClassName="text-black"
              firstLabel={rootLabel}
              secondLabel={rootDescription || ''}
            />
          </li>
        )}
      </ul>
    </nav>
  );
};
