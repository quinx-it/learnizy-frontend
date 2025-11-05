'use client';

import React, { FC, ReactNode, CSSProperties } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

import { IMarkdownRendererProps } from './typings';

export const MarkdownRenderer: FC<IMarkdownRendererProps> = (props) => {
  const { text = '', className } = props;

  const markdownComponents: Components = {
    code: (({ inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');

      return !inline && match ? (
        <SyntaxHighlighter
          style={{ ...coldarkDark } as { [key: string]: CSSProperties }}
          language={match[1]}
          PreTag="div"
          className="my-2 overflow-x-auto rounded-lg p-4 text-sm"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className="rounded bg-gray-100 px-1 py-0.5 text-sm" {...props}>
          {children}
        </code>
      );
    }) as FC<{ inline?: boolean; className?: string; children?: ReactNode }>,
    p: ({ children, ...props }) => (
      <p className="mb-2 leading-relaxed" {...props}>
        {children}
      </p>
    ),
    li: ({ children, ...props }) => (
      <li className="mb-1 ml-4 list-disc" {...props}>
        {children}
      </li>
    ),
    ul: ({ children, ...props }) => (
      <ul className="mb-2 ml-4 list-disc" {...props}>
        {children}
      </ul>
    ),
    ol: ({ children, ...props }) => (
      <ol className="mb-2 ml-4 list-decimal" {...props}>
        {children}
      </ol>
    ),
    table: ({ children, ...props }) => (
      <div className="mb-4 max-w-full overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm" {...props}>
          {children}
        </table>
      </div>
    ),

    thead: ({ children, ...props }) => <thead {...props}>{children}</thead>,
    tbody: ({ children, ...props }) => <tbody {...props}>{children}</tbody>,
    tr: ({ children, ...props }) => <tr {...props}>{children}</tr>,
    th: ({ children, ...props }) => (
      <th
        className="border border-gray-300 bg-gray-100 px-2 py-1 text-left text-sm font-semibold"
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ children, ...props }) => (
      <td className="border border-gray-300 px-2 py-1" {...props}>
        {children}
      </td>
    ),
    blockquote: ({ children, ...props }) => (
      <blockquote className="mb-2 border-l-4 border-gray-400 pl-4 italic" {...props}>
        {children}
      </blockquote>
    ),
    a: ({ children, href, ...props }) => (
      <a className="text-blue-600 underline" href={href} {...props}>
        {children}
      </a>
    ),
    em: ({ children, ...props }) => <em {...props}>{children}</em>,
    strong: ({ children, ...props }) => <strong {...props}>{children}</strong>,
    del: ({ children, ...props }) => <del {...props}>{children}</del>,
    hr: (props) => <hr className="my-4 border-gray-300" {...props} />,
    img: ({ src, alt, ...props }) => (
      <img className="max-w-full rounded" src={src} alt={alt} {...props} />
    ),
    pre: ({ children, ...props }) => (
      <pre className="mb-2" {...props}>
        {children}
      </pre>
    ),
  };

  const normalizeMarkdown = (input: string) =>
    input
      .replace(/\\n/g, '\n')
      .replace(/\r\n/g, '\n')
      .replace(/\n{2,}/g, '\n\n')
      .trim();

  return (
    <div className={className}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {normalizeMarkdown(text)}
      </ReactMarkdown>
    </div>
  );
};
