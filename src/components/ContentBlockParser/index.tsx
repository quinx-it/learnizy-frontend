import { Box } from '@mui/material';
import Image from 'next/image';
import { type FC } from 'react';

import {
  type Block,
  BlockType,
  getTextVariant,
  headingTags,
  headingVariants,
} from '@/api/endpoints/lessons';
import Link from '@/components/Link';
import { Heading, Text } from '@/components/Typography';

import { type IBlockRendererProps } from './typings';

import {
  AdviceContainer,
  BoxedTextContainer,
  Code,
  CodeBlock,
  Figcaption,
  Figure,
  ListItem,
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
    case BlockType.Heading:
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

    case BlockType.Text: {
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

    case BlockType.Link:
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

    case BlockType.Ul:
      return (
        <UnorderedList style={{ marginBottom: block.properties.mb ?? 0 }}>
          {renderChildren(block.children)}
        </UnorderedList>
      );

    case BlockType.Li: {
      const liStyle = {
        marginBottom: block.properties.mb ?? 0,
        color: block.properties.color,
      };

      return (
        <ListItem style={liStyle}>
          {block.content}
          {renderChildren(block.children)}
        </ListItem>
      );
    }

    case BlockType.Code:
      return (
        <CodeBlock style={baseStyle}>
          <Code>
            {block.content}
            {renderChildren(block.children)}
          </Code>
        </CodeBlock>
      );

    case BlockType.Image: {
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

    case BlockType.Advice:
      return (
        <AdviceContainer style={baseStyle}>
          <StrongText>
            <Image src="/images/lightbulb-icon.svg" alt="Lightbulb icon" width={26} height={26} />
            {block.content}
          </StrongText>
          {renderChildren(block.children)}
        </AdviceContainer>
      );

    case BlockType.Warning:
      return (
        <WarningContainer style={baseStyle}>
          <StrongTextWithGap>
            <Image
              src="/images/notification-icon-warning.svg"
              alt="Warning"
              width={18}
              height={18}
            />
            {block.content}
          </StrongTextWithGap>
          {renderChildren(block.children)}
        </WarningContainer>
      );

    case BlockType.BoxedText:
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
