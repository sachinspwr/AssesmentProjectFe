import React from 'react';

export function Paragraph({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className="text-base leading-relaxed mb-4 text-gray-700" {...props}>
    {children}
  </p>
}

export function Blockquote({ children, ...props }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) {
  return <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-600 my-4 py-2 bg-blue-50" {...props}>
    {children}
  </blockquote>
}

export function HorizontalRule({ ...props }: React.HTMLAttributes<HTMLHRElement>) {
  return <hr className="my-8 border-t border-gray-200" {...props} />
}

