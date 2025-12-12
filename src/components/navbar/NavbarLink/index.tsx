'use client';

import Image from 'next/image';
import { type FC } from 'react';

import { usePathname } from '@/hooks';

import { type INavbarLinkProps } from './typings';

import { IconWrapper, StyledButton, StyledLink, StyledText } from './styles';

const NavbarLink: FC<INavbarLinkProps> = (props) => {
  const { href, src, Icon, iconWidth = 16, iconHeight = 16, label, onClick } = props;

  const pathname = usePathname();
  const isActive =
    pathname.split('/').slice(0, 3).join('/') === String(href).split('/').slice(0, 3).join('/');

  return (
    <StyledLink href={href.toString()} onClick={onClick}>
      <StyledButton isActive={isActive}>
        <IconWrapper>
          {src ? (
            <Image src={src} alt={label} width={iconWidth} height={iconHeight} />
          ) : (
            Icon && <Icon />
          )}
        </IconWrapper>
        <StyledText>{label}</StyledText>
      </StyledButton>
    </StyledLink>
  );
};

export default NavbarLink;
