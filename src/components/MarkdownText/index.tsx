'use client';

import { Box } from '@mui/material';
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
    p: (props) => <Paragraph {...props} />,
    li: (props) => <ListItem {...props} />,
    ul: (props) => <UnorderedList {...props} />,
    ol: (props) => <OrderedList {...props} />,
    table: ({ children, ...props }) => (
      <TableWrapper>
        <StyledTable {...props}>{children}</StyledTable>
      </TableWrapper>
    ),

    thead: (props) => <thead {...props} />,
    tbody: (props) => <tbody {...props} />,
    tr: (props) => <tr {...props} />,
    th: (props) => <TableHeaderCell {...props} />,
    td: (props) => <TableCell {...props} />,
    blockquote: (props) => <Blockquote {...props} />,
    a: (props) => <Anchor {...props} />,
    em: (props) => <em {...props} />,
    strong: (props) => <strong {...props} />,
    del: (props) => <del {...props} />,
    hr: (props) => <HorizontalRule {...props} />,
    img: (props) => <StyledImage {...props} />,
    pre: (props) => <Preformatted {...props} />,
  };

  const normalizeMarkdown = (input: string) =>
    input
      .replace(/\\n/g, '\n')
      .replace(/\r\n/g, '\n')
      .replace(/\n{2,}/g, '\n\n')
      .trim();

  return (
    <Box className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {normalizeMarkdown(text)}
      </ReactMarkdown>
    </Box>
  );
};

export default MarkdownRenderer;
