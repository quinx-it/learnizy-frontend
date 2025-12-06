'use client';

import { Fragment, FC } from 'react';

import { ArrowRightIcon } from '@/components/Icons';
import { Text } from '@/components/Typography';
import { useTranslation } from '@/hooks';

import { constants } from './constants';
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

  const { items, rootLabel, rootHref = constants.rootHref, className, rootDescription } = props;

  const translatedRootLabel = rootLabel || t(constants.rootLabel);

  return (
    <StyledNav className={className}>
      <StyledList>
        {items ? (
          <>
            <StyledListItem>
              <StyledRootLink href={rootHref} hasItems={!!items}>
                <Text variant="l">{t(translatedRootLabel)}</Text>
              </StyledRootLink>
            </StyledListItem>
            {items.map((crumb, index) => (
              <Fragment key={crumb.href}>
                <StyledListItem>
                  <ArrowRightIcon color="blue" className="size-2.5" />
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
                {t(translatedRootLabel)}
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
