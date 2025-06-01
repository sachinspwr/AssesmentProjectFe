import React from 'react';
import VTable, { VTableColumn } from '@components/organisms/table/v-table.organism';

interface PreviewProps<T> {
  title: string;
  data: T[];
  columns: VTableColumn<T>[];
  getId: (item: T) => string;
  onSelect?: (selectedIds: string[]) => void;
  cellErrors?: Record<string, Record<string, string>>;
  isRowInvalid?: (item: T) => boolean;
}

function Preview<T>({ title, data, columns, getId, onSelect, isRowInvalid }: PreviewProps<T>) {
  return (
    <div className=" my-8">
      <VTable
        title={title}
        data={data}
        columns={columns}
        itemsPerviewMode={10}
        mode="select"
        getId={getId}
        headerClassName="font-[600]"
        tableClassName="w-full border border-gray-200"
        emptyState={<div>No data found!</div>}
        onSelect={onSelect}
        isRowInvalid={isRowInvalid}
      />
    </div>
  );
}

export default Preview;
