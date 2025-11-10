'use client';

import { FC, ReactNode, CSSProperties } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

import { IMarkdownRendererProps } from './typings';

import {
  Anchor,
  Blockquote,
  CodeBlock,
  HorizontalRule,
  Image as StyledImage,
  InlineCode,
  ListItem,
  OrderedList,
  Paragraph,
  Preformatted,
  StyledTable,
  TableCell,
  TableHeaderCell,
  TableWrapper,
  UnorderedList,
  Wrapper,
} from './styles';

const MarkdownRenderer: FC<IMarkdownRendererProps> = (props) => {
  const { text = '', className } = props;

  const markdownComponents: Components = {
    code: (({ inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');

      if (!inline && match) {
        return (
          <CodeBlock
            style={{ ...coldarkDark } as { [key: string]: CSSProperties }}
            language={match[1]}
            PreTag="div"
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </CodeBlock>
        );
      }

      return <InlineCode {...props}>{children}</InlineCode>;
    }) as FC<{ inline?: boolean; className?: string; children?: ReactNode }>,
    p: ({ children, ...props }) => <Paragraph {...props}>{children}</Paragraph>,
    li: ({ children, ...props }) => <ListItem {...props}>{children}</ListItem>,
    ul: ({ children, ...props }) => <UnorderedList {...props}>{children}</UnorderedList>,
    ol: ({ children, ...props }) => <OrderedList {...props}>{children}</OrderedList>,
    table: ({ children, ...props }) => (
      <TableWrapper>
        <StyledTable {...props}>{children}</StyledTable>
      </TableWrapper>
    ),

    thead: ({ children, ...props }) => <thead {...props}>{children}</thead>,
    tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
    tr: ({ children, ...props }) => <tr {...props}>{children}</tr>,
    th: ({ children, ...props }) => <TableHeaderCell {...props}>{children}</TableHeaderCell>,
    td: ({ children, ...props }) => <TableCell {...props}>{children}</TableCell>,
    blockquote: ({ children, ...props }) => <Blockquote {...props}>{children}</Blockquote>,
    a: ({ children, href, ...props }) => (
      <Anchor href={href} {...props}>
        {children}
      </Anchor>
    ),
    em: ({ children, ...props }) => <em {...props}>{children}</em>,
    strong: ({ children, ...props }) => <strong {...props}>{children}</strong>,
    del: ({ children, ...props }) => <del {...props}>{children}</del>,
    hr: (props) => <HorizontalRule {...props} />,
    img: ({ src, alt, ...props }) => <StyledImage src={src} alt={alt} {...props} />,
    pre: ({ children, ...props }) => <Preformatted {...props}>{children}</Preformatted>,
  };

  const normalizeMarkdown = (input: string) =>
    input
      .replace(/\\n/g, '\n')
      .replace(/\r\n/g, '\n')
      .replace(/\n{2,}/g, '\n\n')
      .trim();

  return (
    <Wrapper className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {normalizeMarkdown(text)}
      </ReactMarkdown>
    </Wrapper>
  );
};

export default MarkdownRenderer;
