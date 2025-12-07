import Image from 'next/image';
import { FC } from 'react';

import { usePathname } from '@/hooks';

import { IDashboardLinkProps } from './typings';

import { IconWrapper, StyledLink } from './styles';

const DashboardLink: FC<IDashboardLinkProps> = (props) => {
  const { href, iconSrc, Icon, iconWidth = 16, iconHeight = 16, children } = props;

  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <StyledLink href={href} isActive={isActive}>
      <IconWrapper>
        {iconSrc && <Image src={iconSrc} alt="" width={iconWidth} height={iconHeight} />}
        {!iconSrc && Icon && <Icon />}
      </IconWrapper>
      {children}
    </StyledLink>
  );
};

export default DashboardLink;
