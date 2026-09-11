'use client';

import LinkBase from 'next/link';
import { type FC } from 'react';

import { useTranslation } from '@/hooks';

import { type LinkProps } from './typings';

const Link: FC<LinkProps> = ({ href, children, ...props }) => {
  const { lang } = useTranslation();

  const path = typeof href === 'string' ? href : String(href);
  const localizedHref = `/${lang}${path.startsWith('/') ? path : `/${path}`}`;

  return (
    <LinkBase href={localizedHref} {...props}>
      {children}
    </LinkBase>
  );
};

export default Link;
