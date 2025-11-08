import { FC } from 'react';

import Button from '@/components/Button';
import Link from '@/components/Link';
import { usePathname } from '@/hooks';
import { cn } from '@/lib/utils';

import { IDashboardLinkProps } from './typings';

const DashboardLink: FC<IDashboardLinkProps> = (props) => {
  const { href, Icon, children } = props;

  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Button variant="white" asChild>
      <Link
        href={href}
        className={cn(isActive && 'bg-soft', 'justify-start border-0 !text-[16px]')}
      >
        <Icon className="mr-2.5 h-[20px] w-[20px] text-black" />
        {children}
      </Link>
    </Button>
  );
};

export default DashboardLink;
