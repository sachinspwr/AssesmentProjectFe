/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import remarkGfm from 'remark-gfm';
import clsx from 'clsx';
import { 
  H1, H2, H3, H4, 
  Paragraph, 
  Strong, 
  Emphasis, 
  UnorderedList, 
  OrderedList,
  ListItem,
  CodeBlock, 
  Table, 
  TableHead, 
  TableBody, 
  TableRow, 
  TableHeaderCell, 
  TableCell, 
  Blockquote, 
  HorizontalRule 
} from './blocks';
import { MarkdownRendererProps } from './types';

// Type for ReactMarkdown components prop
type MarkdownComponents = Parameters<typeof ReactMarkdown>['0']['components'];

function MarkdownRenderer({ markdownText, className }: MarkdownRendererProps) {
  const components: MarkdownComponents = {
    h1: ({ node, ...props }) => <H1 {...props} />,
    h2: ({ node, ...props }) => <H2 {...props} />,
    h3: ({ node, ...props }) => <H3 {...props} />,
    h4: ({ node, ...props }) => <H4 {...props} />,
    p: ({ node, ...props }) => <Paragraph {...props} />,
    strong: ({ node, ...props }) => <Strong {...props} />,
    em: ({ node, ...props }) => <Emphasis {...props} />,
    ul: ({ node, ...props }) => <UnorderedList {...props} />,
    ol: ({ node, ...props }) => <OrderedList {...props} />,
    li: ({ node, ...props }) => (
      <ListItem {...props} />
    ),
    code: ({ node, inline, className, ...props }) => (
      <CodeBlock 
        inline={inline} 
        className={className} 
        {...props} 
      />
    ),
    table: ({ node, ...props }) => <Table {...props} />,
    thead: ({ node, ...props }) => <TableHead {...props} />,
    tbody: ({ node, ...props }) => <TableBody {...props} />,
    tr: ({ node, ...props }) => <TableRow {...props} />,
    th: ({ node, ...props }) => <TableHeaderCell {...props} />,
    td: ({ node, ...props }) => <TableCell {...props} />,
    blockquote: ({ node, ...props }) => <Blockquote {...props} />,
    hr: ({ node, ...props }) => <HorizontalRule {...props} />,
    a: ({ node, href, ...props }) => (
      <a 
        href={href} 
        target="_blank" 
        rel="noopener noreferrer" 
        {...props} 
      />
    ),
  };

  return (
    <div className={clsx('markdown-container', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
        components={components}
      >
        {markdownText}
      </ReactMarkdown>
    </div>
  );
}

export default MarkdownRenderer;