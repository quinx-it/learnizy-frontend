'use client';

import Image from 'next/image';
import { Fragment, FC } from 'react';

import { Text } from '@/components/Typography';
import { useTranslation } from '@/hooks';

import { DEFAULT_ROOT_HREF } from './constants';
import { IBreadcrumbsProps } from './typings';

import {
  StyledNav,
  StyledList,
  StyledListItem,
  StyledRootLink,
  StyledLink,
  StyledText,
  StyledDotTitleContainer,
  StyledDotTitleHeading,
  StyledDotTitleSecondLabel,
  StyledDotTitleDot,
} from './styles';

const Breadcrumbs: FC<IBreadcrumbsProps> = (props) => {
  const { t } = useTranslation();

  const {
    items,
    rootLabel = t('NAVBAR.HOME'),
    rootHref = DEFAULT_ROOT_HREF,
    className,
    rootDescription,
  } = props;

  return (
    <StyledNav className={className}>
      <StyledList>
        {items ? (
          <>
            <StyledListItem>
              <StyledRootLink href={rootHref} hasItems={!!items}>
                <Text variant="l">{t(rootLabel)}</Text>
              </StyledRootLink>
            </StyledListItem>
            {items.map((crumb, index) => (
              <Fragment key={crumb.href}>
                <StyledListItem>
                  <Image
                    src="/images/arrow-right-icon.svg"
                    alt="Arrow right icon"
                    width={9}
                    height={16}
                    className="size-2.5"
                    style={{ color: '#238BA7' }}
                  />
                  {index === items.length - 1 ? (
                    <StyledText variant="l">{t(crumb.label)}</StyledText>
                  ) : (
                    <StyledLink href={crumb.href}>
                      <Text variant="l">{t(crumb.label)}</Text>
                    </StyledLink>
                  )}
                </StyledListItem>
              </Fragment>
            ))}
          </>
        ) : (
          <StyledListItem>
            <StyledDotTitleContainer>
              <StyledDotTitleHeading variant="2xl">
                {t(rootLabel)}
                <StyledDotTitleSecondLabel>
                  <StyledDotTitleDot>•</StyledDotTitleDot>
                  {rootDescription || ''}
                </StyledDotTitleSecondLabel>
              </StyledDotTitleHeading>
            </StyledDotTitleContainer>
          </StyledListItem>
        )}
      </StyledList>
    </StyledNav>
  );
};

export default Breadcrumbs;
