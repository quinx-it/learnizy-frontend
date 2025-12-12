import { type LinkProps as LinkPropsBase } from 'next/link';
import { type PropsWithChildren, type AnchorHTMLAttributes } from 'react';

export type LinkProps = PropsWithChildren & LinkPropsBase & AnchorHTMLAttributes<HTMLAnchorElement>;
