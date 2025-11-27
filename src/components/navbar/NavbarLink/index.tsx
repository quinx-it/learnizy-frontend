'use client';

import { FC } from 'react';

import Button from '@/components/Button';
import { usePathname } from '@/hooks';

import { INavbarLinkProps } from './typings';

import { IconWrapper, StyledLink, StyledText } from './styles';

const NavbarLink: FC<INavbarLinkProps> = (props) => {
  const { href, Icon, label, className, onClick } = props;

  const pathname = usePathname();
  const isActive =
    pathname.split('/').slice(0, 3).join('/') === String(href).split('/').slice(0, 3).join('/');

  return (
    <Button onClick={onClick} variant={isActive ? 'blue' : 'white'} asChild className={className}>
      <StyledLink href={href.toString()}>
        <IconWrapper>
          <Icon />
        </IconWrapper>
        <StyledText as="span">{label}</StyledText>
      </StyledLink>
    </Button>
  );
};

export default NavbarLink;
