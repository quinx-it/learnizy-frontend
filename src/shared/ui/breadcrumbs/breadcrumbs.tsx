'use client';

import Link from 'next/link';
import { Fragment, FC } from 'react';
import { DotTitle } from '../DotTitle';
import { ArrowRightIcon } from '@/shared/ui/icons';
import { Text } from '@/shared/ui/typography';
import { cn } from '@/shared/lib/utils';
import { constants } from './constants';
import { IBreadcrumbsProps } from './typings';
import { useTranslation } from 'react-i18next';

export const Breadcrumbs: FC<IBreadcrumbsProps> = (props) => {
  const { t } = useTranslation();

  const {
    items,
    rootLabel = t(constants.rootLabel),
    rootHref = constants.rootHref,
    className,
    rootDescription,
  } = props;

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
                <Text variant={'l'}> {t(rootLabel)}</Text>
              </Link>
            </li>
            {items.map((crumb, index) => (
              <Fragment key={crumb.href}>
                <li className="flex items-center gap-2">
                  <ArrowRightIcon color="blue" className="size-2.5" />
                  {index === items.length - 1 ? (
                    <Text variant={'l'} className="text-medium">
                      {t(crumb.label)}
                    </Text>
                  ) : (
                    <Link href={crumb.href}>
                      <Text variant={'l'} className="text-soft hover:text-medium">
                        {t(crumb.label)}
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
              firstLabel={t(rootLabel)}
              secondLabel={rootDescription || ''}
            />
          </li>
        )}
      </ul>
    </nav>
  );
};
