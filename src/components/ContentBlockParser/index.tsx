import { Box } from '@mui/material';
import Image from 'next/image';
import { FC } from 'react';

import {
  Block,
  BlockType,
  getTextVariant,
  headingTags,
  headingVariants,
} from '@/api/endpoints/lessons';
import { LightbulbIcon, NotificationIcon } from '@/components/Icons';
import Link from '@/components/Link';
import { Heading, Text } from '@/components/Typography';

import { IBlockRendererProps } from './typings';

import {
  AdviceContainer,
  BoxedTextContainer,
  Code,
  CodeBlock,
  Figcaption,
  Figure,
  StrongText,
  StrongTextWithGap,
  StrongTextWithoutGap,
  StyledLinkWrapper,
  UnorderedList,
  WarningContainer,
} from './styles';

const defaultStyles = {
  display: 'block',
  marginBottom: 0,
};

const BlockRenderer: FC<IBlockRendererProps> = (props) => {
  const { block } = props;

  const baseStyle = {
    marginBottom: block.properties.mb ?? defaultStyles.marginBottom,
    color: block.properties.color,
    display: block.properties.inline ? 'inline' : defaultStyles.display,
  };

  const renderChildren = (children?: Block[]) =>
    children?.map((child) => <BlockRenderer key={child.id} block={child} />);

  switch (block.blockType) {
    case BlockType.HEADING:
      return (
        <Heading
          tag={headingTags[block.properties.level]}
          variant={headingVariants[block.properties.level]}
          style={baseStyle}
        >
          {block.content}
          {renderChildren(block.children)}
        </Heading>
      );

    case BlockType.TEXT: {
      const hasChildren = block.children && block.children.length > 0;
      const variant = getTextVariant(block.properties.size ?? 'm', block.properties.style);

      if (hasChildren) {
        return (
          <Box style={baseStyle}>
            {block.content && (
              <Text variant={variant} tag="span">
                {block.content}
              </Text>
            )}
            {renderChildren(block.children)}
          </Box>
        );
      }

      return (
        <Text variant={variant} style={baseStyle}>
          {block.content}
        </Text>
      );
    }

    case BlockType.LINK:
      return (
        <StyledLinkWrapper style={baseStyle}>
          <Link
            href={block.properties.url}
            target={block.properties.target}
            rel={block.properties.target === '_blank' ? 'noopener noreferrer' : undefined}
          >
            {block.content}
            {renderChildren(block.children)}
          </Link>
        </StyledLinkWrapper>
      );

    case BlockType.UL:
      return (
        <UnorderedList style={{ marginBottom: block.properties.mb ?? 0 }}>
          {renderChildren(block.children)}
        </UnorderedList>
      );

    case BlockType.LI: {
      const liStyle = {
        marginBottom: block.properties.mb ?? 0,
        color: block.properties.color,
      };

      return (
        <Box style={liStyle}>
          {block.content}
          {renderChildren(block.children)}
        </Box>
      );
    }

    case BlockType.CODE:
      return (
        <CodeBlock style={baseStyle}>
          <Code>
            {block.content}
            {renderChildren(block.children)}
          </Code>
        </CodeBlock>
      );

    case BlockType.IMAGE: {
      const isValidUrl = (str: string) => {
        try {
          const url = new URL(str);

          return url.protocol === 'http:' || url.protocol === 'https:';
        } catch {
          return false;
        }
      };

      if (!isValidUrl(block.content)) return null;

      return (
        <Figure style={baseStyle}>
          <Image
            src={block.content}
            width={block.properties.width ?? 400}
            height={block.properties.height ?? 300}
            alt={block.properties.alt ?? ''}
          />
          {block.properties.caption && <Figcaption>{block.properties.caption}</Figcaption>}
          {renderChildren(block.children)}
        </Figure>
      );
    }

    case BlockType.ADVICE:
      return (
        <AdviceContainer style={baseStyle}>
          <StrongText>
            <LightbulbIcon />
            {block.content}
          </StrongText>
          {renderChildren(block.children)}
        </AdviceContainer>
      );

    case BlockType.WARNING:
      return (
        <WarningContainer style={baseStyle}>
          <StrongTextWithGap>
            <NotificationIcon status="warning" />
            {block.content}
          </StrongTextWithGap>
          {renderChildren(block.children)}
        </WarningContainer>
      );

    case BlockType.BOXED_TEXT:
      return (
        <BoxedTextContainer style={baseStyle}>
          <StrongTextWithoutGap>{block.content}</StrongTextWithoutGap>
          {renderChildren(block.children)}
        </BoxedTextContainer>
      );

    default:
      return null;
  }
};

export default BlockRenderer;
