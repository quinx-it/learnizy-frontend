'use client';

import { Fragment, type FC } from 'react';

import { Text } from '@/components/Typography';
import { ROUTES } from '@/const/routes';
import { useTranslation } from '@/hooks';

import { type IBreadcrumbsProps } from './typings';

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
  ArrowIcon,
} from './styles';

const Breadcrumbs: FC<IBreadcrumbsProps> = (props) => {
  const { t } = useTranslation();

  const {
    items,
    rootLabel = t('NAVBAR.HOME'),
    rootHref = ROUTES.USER_HOME_PAGE,
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
                  <ArrowIcon
                    src="/images/arrow-right-icon.svg"
                    alt="Arrow right icon"
                    width={10}
                    height={10}
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
