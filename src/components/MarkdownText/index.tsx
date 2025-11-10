'use client';

import { FC, ReactNode, CSSProperties } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

import { IMarkdownRendererProps } from './typings';

import * as S from './styles';

const MarkdownRenderer: FC<IMarkdownRendererProps> = (props) => {
  const { text = '', className } = props;

  const markdownComponents: Components = {
    code: (({ inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');

      if (!inline && match) {
        return (
          <S.CodeBlock
            style={{ ...coldarkDark } as { [key: string]: CSSProperties }}
            language={match[1]}
            PreTag="div"
            {...props}
          >
            {String(children).replace(/\n$/, '')}
          </S.CodeBlock>
        );
      }

      return <S.InlineCode {...props}>{children}</S.InlineCode>;
    }) as FC<{ inline?: boolean; className?: string; children?: ReactNode }>,
    p: ({ children, ...props }) => <S.Paragraph {...props}>{children}</S.Paragraph>,
    li: ({ children, ...props }) => <S.ListItem {...props}>{children}</S.ListItem>,
    ul: ({ children, ...props }) => <S.UnorderedList {...props}>{children}</S.UnorderedList>,
    ol: ({ children, ...props }) => <S.OrderedList {...props}>{children}</S.OrderedList>,
    table: ({ children, ...props }) => (
      <S.TableWrapper>
        <S.StyledTable {...props}>{children}</S.StyledTable>
      </S.TableWrapper>
    ),

    thead: ({ children, ...props }) => <thead {...props}>{children}</thead>,
    tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
    tr: ({ children, ...props }) => <tr {...props}>{children}</tr>,
    th: ({ children, ...props }) => <S.TableHeaderCell {...props}>{children}</S.TableHeaderCell>,
    td: ({ children, ...props }) => <S.TableCell {...props}>{children}</S.TableCell>,
    blockquote: ({ children, ...props }) => <S.Blockquote {...props}>{children}</S.Blockquote>,
    a: ({ children, href, ...props }) => (
      <S.Anchor href={href} {...props}>
        {children}
      </S.Anchor>
    ),
    em: ({ children, ...props }) => <em {...props}>{children}</em>,
    strong: ({ children, ...props }) => <strong {...props}>{children}</strong>,
    del: ({ children, ...props }) => <del {...props}>{children}</del>,
    hr: (props) => <S.HorizontalRule {...props} />,
    img: ({ src, alt, ...props }) => <S.Image src={src} alt={alt} {...props} />,
    pre: ({ children, ...props }) => <S.Preformatted {...props}>{children}</S.Preformatted>,
  };

  const normalizeMarkdown = (input: string) =>
    input
      .replace(/\\n/g, '\n')
      .replace(/\r\n/g, '\n')
      .replace(/\n{2,}/g, '\n\n')
      .trim();

  return (
    <S.Wrapper className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {normalizeMarkdown(text)}
      </ReactMarkdown>
    </S.Wrapper>
  );
};

export default MarkdownRenderer;
