import { FC } from 'react';

import { usePathname } from '@/hooks';

import { IDashboardLinkProps } from './typings';

import { IconWrapper, StyledButton, StyledLink } from './styles';

const DashboardLink: FC<IDashboardLinkProps> = (props) => {
  const { href, Icon, children } = props;

  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <StyledButton variant="white" isActive={isActive} asChild>
      <StyledLink href={href}>
        <IconWrapper>
          <Icon />
        </IconWrapper>
        {children}
      </StyledLink>
    </StyledButton>
  );
};

export default DashboardLink;
