'use client';

import { FC } from 'react';

import { usePathname } from '@/hooks';

import { INavbarLinkProps } from './typings';

import { IconWrapper, StyledButton, StyledLink, StyledText } from './styles';

const NavbarLink: FC<INavbarLinkProps> = (props) => {
  const { href, Icon, label, onClick } = props;

  const pathname = usePathname();
  const isActive =
    pathname.split('/').slice(0, 3).join('/') === String(href).split('/').slice(0, 3).join('/');

  return (
    <StyledLink href={href.toString()} onClick={onClick}>
      <StyledButton isActive={isActive}>
        <IconWrapper>
          <Icon />
        </IconWrapper>
        <StyledText>{label}</StyledText>
      </StyledButton>
    </StyledLink>
  );
};

export default NavbarLink;
