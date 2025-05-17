import React from 'react';

export function Table({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return <div className="overflow-x-auto my-6 rounded-lg border border-gray-200">
    <table className="min-w-full divide-y divide-gray-200" {...props}>
      {children}
    </table>
  </div>
}

export function TableHead({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className="bg-gray-50" {...props}>
    {children}
  </thead>
}

export function TableBody({ children, ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className="divide-y divide-gray-200 bg-white" {...props}>
    {children}
  </tbody>
}

export function TableRow({ children, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return <tr {...props}>
    {children}
  </tr>
}

export function TableHeaderCell({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) {
  return <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" {...props}>
    {children}
  </th>
}

export function TableCell({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) {
  return <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700" {...props}>
    {children}
  </td>
}