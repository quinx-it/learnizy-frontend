import { FC } from 'react';

import { usePathname } from '@/hooks';

import { IDashboardLinkProps } from './typings';

import { IconWrapper, StyledLink } from './styles';

const DashboardLink: FC<IDashboardLinkProps> = (props) => {
  const { href, Icon, children } = props;

  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <StyledLink href={href} isActive={isActive}>
      <IconWrapper>
        <Icon />
      </IconWrapper>
      {children}
    </StyledLink>
  );
};

export default DashboardLink;
