import { LinkProps as LinkPropsBase } from 'next/link';
import { PropsWithChildren, AnchorHTMLAttributes } from 'react';

export type LinkProps = PropsWithChildren & LinkPropsBase & AnchorHTMLAttributes<HTMLAnchorElement>;
