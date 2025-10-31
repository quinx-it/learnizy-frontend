import { PropsWithChildren } from 'react';
import { IHeadProps } from '@/shared/components/Head/typings';

export interface IPageProps extends PropsWithChildren, IHeadProps {
  seo?: Record<string, Omit<IHeadProps, 'seo'>>;
}
