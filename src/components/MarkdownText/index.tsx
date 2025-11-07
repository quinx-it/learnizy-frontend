'use client';

import { FC, ReactNode, CSSProperties } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

import { IMarkdownRendererProps } from './typings';
import {
  Container,
  CodeBlockWrapper,
  InlineCode,
  Paragraph,
  ListItem,
  UnorderedList,
  OrderedList,
  TableWrapper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
  Blockquote,
  StyledLink,
  HorizontalRule,
  Image,
  Pre,
} from './styles';

const MarkdownRenderer: FC<IMarkdownRendererProps> = (props) => {
  const { text = '', className } = props;

  const markdownComponents: Components = {
    code: (({ inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');

      return !inline && match ? (
        <CodeBlockWrapper>
          <SyntaxHighlighter
            style={{ ...coldarkDark } as { [key: string]: CSSProperties }}
            language={match[1]}
            PreTag="div"
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </SyntaxHighlighter>
        </CodeBlockWrapper>
      ) : (
        <InlineCode {...props}>{children}</InlineCode>
      );
    }) as FC<{ inline?: boolean; className?: string; children?: ReactNode }>,
    p: ({ children, ...props }) => <Paragraph {...props}>{children}</Paragraph>,
    li: ({ children, ...props }) => <ListItem {...props}>{children}</ListItem>,
    ul: ({ children, ...props }) => <UnorderedList {...props}>{children}</UnorderedList>,
    ol: ({ children, ...props }) => <OrderedList {...props}>{children}</OrderedList>,
    table: ({ children, ...props }) => (
      <TableWrapper>
        <Table {...props}>{children}</Table>
      </TableWrapper>
    ),
    thead: ({ children, ...props }) => <TableHead {...props}>{children}</TableHead>,
    tbody: ({ children, ...props }) => <TableBody {...props}>{children}</TableBody>,
    tr: ({ children, ...props }) => <TableRow {...props}>{children}</TableRow>,
    th: ({ children, ...props }) => <TableHeader {...props}>{children}</TableHeader>,
    td: ({ children, ...props }) => <TableCell {...props}>{children}</TableCell>,
    blockquote: ({ children, ...props }) => <Blockquote {...props}>{children}</Blockquote>,
    a: ({ children, href, ...props }) => (
      <StyledLink href={href} {...props}>
        {children}
      </StyledLink>
    ),
    em: ({ children, ...props }) => <em {...props}>{children}</em>,
    strong: ({ children, ...props }) => <strong {...props}>{children}</strong>,
    del: ({ children, ...props }) => <del {...props}>{children}</del>,
    hr: (props) => <HorizontalRule {...props} />,
    img: ({ src, alt, ...props }) => <Image src={src} alt={alt} {...props} />,
    pre: ({ children, ...props }) => <Pre {...props}>{children}</Pre>,
  };

  const normalizeMarkdown = (input: string) =>
    input
      .replace(/\\n/g, '\n')
      .replace(/\r\n/g, '\n')
      .replace(/\n{2,}/g, '\n\n')
      .trim();

  return (
    <Container className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {normalizeMarkdown(text)}
      </ReactMarkdown>
    </Container>
  );
};

export default MarkdownRenderer;
