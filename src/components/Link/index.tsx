'use client';

import LinkBase from 'next/link';
import { FC } from 'react';

import { useTranslation } from '@/hooks';

import { LinkProps } from './typings';

const Link: FC<LinkProps> = ({ href, children, ...props }) => {
  const { lang } = useTranslation();

  const localizedHref = `/${lang}${href}`;

  return (
    <LinkBase href={localizedHref} {...props}>
      {children}
    </LinkBase>
  );
};

export default Link;
