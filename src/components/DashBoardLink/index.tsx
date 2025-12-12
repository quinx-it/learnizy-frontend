import Image from 'next/image';
import { type FC } from 'react';

import { usePathname } from '@/hooks';

import { type IDashboardLinkProps } from './typings';

import { IconWrapper, StyledLink } from './styles';

const DashboardLink: FC<IDashboardLinkProps> = (props) => {
  const { href, src, Icon, iconWidth = 16, iconHeight = 16, children } = props;

  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <StyledLink href={href} isActive={isActive}>
      <IconWrapper>
        {src ? <Image src={src} alt="" width={iconWidth} height={iconHeight} /> : Icon && <Icon />}
      </IconWrapper>
      {children}
    </StyledLink>
  );
};

export default DashboardLink;
