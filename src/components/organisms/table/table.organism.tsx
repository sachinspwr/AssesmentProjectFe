/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Icon } from '@components/atoms';
import { FaTrashCanArrowUp } from 'react-icons/fa6';
import { TbEdit } from 'react-icons/tb';

export interface Column {
  header: string;
  accessor: string;
  contentPosition?: 'center' | 'left' | 'right';
}

type TableProps<T> = {
  keySelector: string;
  data: T[];
  columns: Column[];
  classes?: {
    wrapper?: string;
    table?: string;
    thead?: string;
    thead_tr?: string;
    th?: string;
    tbody?: string;
    tbody_tr?: string;
    td?: string;
  };
  varient?: { border?: 'all' | 'row' | 'col' | 'bottom'; hover?: 'row' | 'col' };
  showIndex?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};

function Table<T>({
  data,
  columns,
  classes = {},
  keySelector,
  varient,
  showIndex = false,
  onEdit,
  onDelete,
}: TableProps<T>) {
  // Apply border variants
  if (varient?.border) {
    switch (varient.border) {
      case 'all':
        classes!.thead_tr = `${classes!.thead_tr || ''} border-x border-y`;
        classes!.tbody_tr = `${classes!.tbody_tr || ''} border-x border-y`;
        classes!.th = `${classes!.th || ''} border-x`;
        classes!.td = `${classes!.td || ''} border-x`;
        break;
      case 'row':
        classes!.tbody_tr = `${classes!.tbody_tr || ''} border-y`;
        break;
      case 'col':
        classes!.td = `${classes!.td || ''} border-x`;
        break;
      case 'bottom':
        classes!.tbody_tr = `${classes!.tbody_tr || ''} border-b`;
        break;
    }
  }

  // Apply hover variants
  if (varient?.hover) {
    switch (varient.hover) {
      case 'row':
        classes!.tbody_tr = `${classes!.tbody_tr || ''} hover:bg-gray-100 hover:text-skin-theme-same`;
        break;
      case 'col':
        classes!.td = `${classes!.td || ''} hover:bg-gray-50`;
        break;
    }
  }

  return (
    <div className={`overflow-x-auto ${classes?.wrapper || ''}`}>
      <table className={`min-w-full divide-y divide-gray-200 ${classes?.table || ''}`}>
        <thead className={`bg-skin-theme-light text-sm text-skin-theme uppercase ${classes?.thead || ''}`}>
          <tr className={classes?.thead_tr || ''}>
            {showIndex && (
              <th
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${classes?.th || ''}`}
              ></th>
            )}
            {columns.map((column) => (
              <th
                key={column.accessor}
                scope="col"
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${classes?.th || ''}`}
              >
                {column.header}
              </th>
            ))}
            {(onEdit || onDelete) && <th></th>}
          </tr>
        </thead>
        <tbody
          className={`divide-y divide-gray-200 ${classes?.tbody || ''}`}
          style={{ maxHeight: '50vh', overflowY: 'auto' }}
        >
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (showIndex ? 1 : 0)} className="px-6 py-4 text-center text-gray-500">
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className={`text-skin-theme-dark cursor-pointer ${classes?.tbody_tr || ''}`}>
                {showIndex && <td className={`px-6 py-4 ${classes?.td || ''}`}>{rowIndex + 1}</td>}
                {columns.map((column) => (
                  <td
                    key={column.accessor}
                    className={`text-${column?.contentPosition || 'left'} px-6 py-4 whitespace-nowrap text-sm ${classes?.td || ''}`}
                  >
                    {(row as any)[column.accessor]}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="flex justify-center items-center gap-2 px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {onEdit && (
                      <Icon
                        icon={TbEdit}
                        size={22}
                        onClick={() => onEdit((row as any)[keySelector])}
                        className="text-blue-700 cursor-pointer"
                      />
                    )}
                    {onDelete && (
                      <Icon
                        icon={FaTrashCanArrowUp}
                        size={18}
                        onClick={() => onDelete((row as any)[keySelector])}
                        className="text-red-700 cursor-pointer"
                      />
                    )}
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export { Table };
