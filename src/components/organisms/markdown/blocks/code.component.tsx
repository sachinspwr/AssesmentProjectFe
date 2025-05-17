import React from 'react';
import { Highlight } from 'prism-react-renderer';
import type { PrismTheme } from 'prism-react-renderer';

export const nord: PrismTheme = {
  plain: {
    color: '#D8DEE9',
    backgroundColor: '#2E3440',
  },
  styles: [
    {
      types: ['comment', 'prolog', 'doctype', 'cdata'],
      style: {
        color: '#636F88',
        fontStyle: 'italic',
      },
    },
    {
      types: ['punctuation'],
      style: {
        color: '#81A1C1',
      },
    },
    {
      types: ['keyword', 'selector', 'variable'],
      style: {
        color: '#88C0D0', // Light blue for keywords and selectors
        fontWeight: 'bold',
      },
    },
    {
      types: ['function', 'method'],
      style: {
        color: '#81A1C1', // Cyan for functions and methods
        fontStyle: 'italic',
      },
    },
    {
      types: ['string', 'char'],
      style: {
        color: '#A3BE8C', // Green for strings and characters
      },
    },
    {
      types: ['number', 'constant'],
      style: {
        color: '#D08770', // Orange for numbers and constants
      },
    },
    {
      types: ['operator', 'entity'],
      style: {
        color: '#EBCB8B', // Yellow for operators and entities
      },
    },
    {
      types: ['tag', 'selector-id', 'selector-class'],
      style: {
        color: '#BF616A', // Red for HTML tags, id, and class selectors
        fontWeight: 'bold',
      },
    },
    {
      types: ['attr-name', 'attr-value'],
      style: {
        color: '#D08770', // Orange for attribute names and values
      },
    },
    {
      types: ['boolean', 'variable-2'],
      style: {
        color: '#B48EAD', // Purple for booleans and secondary variables
      },
    },
    {
      types: ['url'],
      style: {
        color: '#88C0D0', // Blue for URLs
        textDecorationLine: 'underline',
      },
    },
    {
      types: ['deleted'],
      style: {
        color: '#BF616A', // Red for deleted content
        textDecorationLine: 'line-through',
      },
    },
    {
      types: ['inserted'],
      style: {
        color: '#A3BE8C', // Green for inserted content
      },
    },
    {
      types: ['important', 'bold'],
      style: {
        fontWeight: 'bold', // Bold for important elements
        color: '#D8DEE9',
      },
    },
    {
      types: ['italic'],
      style: {
        fontStyle: 'italic', // Italics for italicized text
        color: '#D8DEE9',
      },
    },
  ],
};


interface CodeBlockProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function CodeBlock({ inline, className, children }: CodeBlockProps) {
  const match = /language-(\w+)/.exec(className || '');

  // Convert `children` to string, assuming it should always be a string representation of code
  const codeString = String(children).replace(/\n$/, '');

  return !inline ? (
    <div className="rounded-lg overflow-hidden my-4 shadow-sm border border-gray-200">
      <Highlight theme={nord} code={codeString} language={match?.[1] || 'text'}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  ) : (
    <code className="bg-gray-100 px-1.5 py-0.5 rounded text-sm font-mono text-red-600">{children}</code>
  );
}
