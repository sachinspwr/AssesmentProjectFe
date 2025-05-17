import React from 'react';

export function UnorderedList({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className="list-disc pl-6 mb-4 space-y-1" {...props}>
    {children}
  </ul>
}

export function OrderedList({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) {
  return <ol className="list-decimal pl-6 mb-4 space-y-1" {...props}>
    {children}
  </ol>
}

export function ListItem({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) {
  return <li className="mb-1 pl-2 text-gray-700" {...props}>
    {children}
  </li>
}