import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';

import {
  Block,
  BlockType,
  getTextVariant,
  headingTags,
  headingVariants,
} from '@/api/endpoints/lessons';
import { LightbulbIcon, NotificationIcon } from '@/components/Icons';
import { Heading, Text } from '@/components/Typography';

import { IBlockRendererProps } from './typings';

const defaultStyles = {
  color: '#0C0C0C',
  display: 'block',
  marginBottom: 0,
};

const BlockRenderer: FC<IBlockRendererProps> = (props) => {
  const { block } = props;

  const baseStyle = {
    marginBottom: block.properties.mb ?? defaultStyles.marginBottom,
    color: block.properties.color ?? defaultStyles.color,
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

    case BlockType.TEXT:
      return (
        <Text
          variant={getTextVariant(block.properties.size ?? 'm', block.properties.style)}
          style={baseStyle}
        >
          {block.content}
          {renderChildren(block.children)}
        </Text>
      );

    case BlockType.LINK:
      return (
        <Link
          href={block.properties.url}
          target={block.properties.target}
          rel={block.properties.target === '_blank' ? 'noopener noreferrer' : undefined}
          style={baseStyle}
          className="underline"
        >
          {block.content}
          {renderChildren(block.children)}
        </Link>
      );

    case BlockType.UL:
      return (
        <ul
          className="list-disc pl-5 marker:text-lg marker:text-black"
          style={{ marginBottom: block.properties.mb ?? 0 }}
        >
          {renderChildren(block.children)}
        </ul>
      );

    case BlockType.LI: {
      const liStyle = {
        marginBottom: block.properties.mb ?? 0,
        color: block.properties.color ?? defaultStyles.color,
      };

      return (
        <li style={liStyle}>
          {block.content}
          {renderChildren(block.children)}
        </li>
      );
    }

    case BlockType.CODE:
      return (
        <pre
          className="bg-light border-gray w-full max-w-full overflow-x-auto rounded-2xl border p-4"
          style={baseStyle}
        >
          <code className="block whitespace-pre">
            {block.content}
            {renderChildren(block.children)}
          </code>
        </pre>
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
        <figure style={baseStyle} className="w-fit">
          <Image
            src={block.content}
            width={block.properties.width ?? 400}
            height={block.properties.height ?? 300}
            alt={block.properties.alt ?? ''}
          />
          {block.properties.caption && (
            <figcaption className="text-center">{block.properties.caption}</figcaption>
          )}
          {renderChildren(block.children)}
        </figure>
      );
    }

    case BlockType.ADVICE:
      return (
        <div className="bg-soft w-fit rounded-2xl p-4" style={{ ...baseStyle, color: '#238BA7' }}>
          <strong className="mb-3 flex items-center">
            <LightbulbIcon />
            {block.content}
          </strong>
          {renderChildren(block.children)}
        </div>
      );

    case BlockType.WARNING:
      return (
        <div
          className="w-fit rounded-2xl bg-[#E644444D] p-4"
          style={{ ...baseStyle, color: '#E64444' }}
        >
          <strong className="mb-3 flex items-center gap-2">
            <NotificationIcon status="warning" color="#E64444" />
            {block.content}
          </strong>
          {renderChildren(block.children)}
        </div>
      );

    case BlockType.BOXED_TEXT:
      return (
        <div className="border-gray rounded-2xl border p-4" style={baseStyle}>
          <strong className="mb-3">{block.content}</strong>
          {renderChildren(block.children)}
        </div>
      );

    default:
      return null;
  }
};

export { BlockRenderer };
