import React, { ReactNode, useEffect, useState } from 'react';
import { AiOutlineArrowUp, AiOutlineArrowDown } from 'react-icons/ai';
import VPagination from '../pagination/v-pagination.organism';
import { VButton, VICon } from '@components/atoms';
import { VSearchBox } from '@components/molecules/search/v-search-box.mol';
import { VTypography } from '@components/molecules/typography/v-typography.mol';
import { VCheckbox, VDropdown, VLoader } from '@components/molecules/index';
import { FiEdit } from 'react-icons/fi';
import { FaRegTrashCan } from 'react-icons/fa6';

export interface VTableColumn<T> {
  key: keyof T; // Key for mapping to data
  label: string; // Column header label
  customRender?: (row: T) => React.ReactNode; // Custom render function for the column
  sortable?: boolean; // Indicates if the column is sortable
  searchable?: boolean; // Indicates if the column is searchable
  className?: string;
  hidden?: boolean;
  isRowInvalid?: (row: T) => boolean;
}

interface VTableProps<T> {
  title?: ReactNode;
  data: T[]; // Data array
  columns: VTableColumn<T>[]; // Column configurations
  itemsPerPage?: number; // Number of items per page
  mode?: 'view' | 'select';
  loading?: boolean;
  selectedRowIds?: string[];
  getId?: (row: T) => string;
  onSelect?: (selectedIds: string[]) => void; // Callback to return selected row IDs
  actionsConfig?: Array<{
    label?: ReactNode;
    action: 'create' | 'edit' | 'delete' | 'upload' | 'select';
    responder: (id?: string) => void;
  }>;
  // Class names exposed
  containerClassName?: string;
  headerWrapperClassName?: string;
  searchSectionClassName?: string;
  tableWrapperClassName?: string;
  tableClassName?: string;
  theadClass?: string;
  tbodyClass?: string;
  headerClassName?: string;
  rowClassName?: string;
  paginationWrapperClassName?: string;
  emptyState?: ReactNode;
  isRowInvalid?: (row: T) => boolean;
}

function VTable<T>({
  title,
  data,
  columns,
  itemsPerPage = 10, // Default items per page
  mode = 'view',
  loading = false,
  getId,
  onSelect,
  isRowInvalid,
  selectedRowIds,
  actionsConfig = [], // Default empty array for actions
  containerClassName,
  headerWrapperClassName,
  searchSectionClassName,
  tableWrapperClassName,
  tableClassName = 'min-w-full divide-y ',
  theadClass,
  tbodyClass,
  headerClassName = '',
  rowClassName = '',
  paginationWrapperClassName,
  emptyState = 'No data available',
}: VTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<keyof T | null>(null); // Key to sort by
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null); // Sort order
  const [searchTerm, setSearchTerm] = useState(''); // Search term
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set()); // To track selected rows

  // Get searchable columns
  const searchableColumns = columns.filter((column) => column.searchable);
  const searchableLabels = searchableColumns.map((column) => column.label).join(', ');

  useEffect(() => {
    if (selectedRowIds) {
      setSelectedRows(new Set(selectedRowIds));
    }
  }, [selectedRowIds]);

  // Filtered data based on search term
  const filteredData = React.useMemo(() => {
    if (!searchTerm.trim()) return data;

    return data.filter((row) =>
      searchableColumns.some((column) => String(row[column.key]).toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [data, searchTerm, searchableColumns]);

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortKey || !sortOrder) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
      }
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      return 0; // Fallback for unsupported types
    });
  }, [filteredData, sortKey, sortOrder]);

  // Paginated data
  const paginatedData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Handle page change
  const handlepageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle sorting
  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      // Toggle sort order
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : prev === 'desc' ? null : 'asc'));
      if (sortOrder === 'desc') {
        setSortKey(null); // Reset sorting if toggled past "desc"
        setSortOrder(null);
      }
    } else {
      setSortKey(key);
      setSortOrder('asc'); // Default to ascending order
    }
  };

  // Handle row selection
  const handleRowSelection = (rowId: string, isSelected: boolean) => {
    const updatedSelectedRows = new Set(selectedRows);

    if (isSelected) {
      updatedSelectedRows.add(rowId);
    } else {
      updatedSelectedRows.delete(rowId);
    }

    setSelectedRows(updatedSelectedRows);
    if (onSelect) {
      onSelect(Array.from(updatedSelectedRows)); // Trigger callback with selected rows
    }
  };

  // Handle actions (edit, delete, etc.)
  const handleAction = (id: string, action: string) => {
    const actionConfig = actionsConfig.find((cfg) => cfg.action === action);
    if (actionConfig) {
      actionConfig.responder(id);
    }
  };

  const getActionConfig = (action: string) => actionsConfig.find((x) => x.action === action);

  return (
    <div className={`overflow-x-auto ${containerClassName}`}>
      <div className={`flex flex-col gap-6 ${headerWrapperClassName}`}>
        <div
          className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3  px-4 ${searchSectionClassName}`}
        >
          {/* Title section - always visible */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 w-full sm:w-auto">
            {title && (
              <VTypography as="h4" className="whitespace-nowrap">
                {title}
              </VTypography>
            )}

            {/* Search box when there's no create action (appears after title at half width) */}
            {!getActionConfig('create') && searchableColumns.length > 0 && (
              <div className="w-full sm:w-1/2">
                <VSearchBox
                  value={searchTerm}
                  onChange={(val) => setSearchTerm(val)}
                  placeholder={`Search by ${searchableLabels}`}
                  wrapperClasses="w-full"
                  className="text-base py-2"
                />
              </div>
            )}
              {getActionConfig('select') && (
              <div className="w-full sm:w-1/2">
                <VDropdown
                  value={searchTerm}
                  onChange={(val) => setSearchTerm(val)}
                  placeholder={`Search by ${searchableLabels}`}
                  wrapperClasses="w-full"
                />
              </div>
            )}
          </div>

          {/* Right side section (when create action exists) */}
          {getActionConfig('create') && (
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-end sm:items-center gap-3">
              {/* Search box takes full width on mobile, auto on desktop */}
              {searchableColumns.length > 0 && (
                <div className="w-full sm:w-64">
                  {' '}
                  {/* Fixed width on desktop */}
                  <VSearchBox
                    value={searchTerm}
                    onChange={(val) => setSearchTerm(val)}
                    placeholder={`Search by ${searchableLabels}`}
                    wrapperClasses="w-full"
                    className="text-base py-2"
                  />
                </div>
              )}

              {/* Buttons group */}
              <div className="flex gap-3">
                {getActionConfig('upload') && (
                  <VButton
                    variant="secondary"
                    onClick={getActionConfig('upload')?.responder}
                    className="whitespace-nowrap"
                  >
                    {getActionConfig('upload')?.label ?? 'Upload'}
                  </VButton>
                )}
                <VButton onClick={getActionConfig('create')?.responder} className="whitespace-nowrap">
                  {getActionConfig('create')?.label ?? 'Add'}
                </VButton>
              </div>
            </div>
          )}
        </div>
        <div className={`${tableWrapperClassName}`}>
          <table className={`table-auto bg-theme-default border border-x-0 ${tableClassName}`}>
            {/* Table Header */}
            <thead className={`text-theme-default border-2 border-x-0 ${theadClass}`}>
              <tr className="border-theme-default text-theme-primary">
                {mode === 'select' && <th className="w-12"></th>} {/* Checkbox column in select mode */}
                {columns.map((column, index) => (
                  <th
                    key={String(column.key)}
                    className={`${
                      index === columns.length - 1 ? 'pr-3' : 'px-6'
                    } py-4 text-left text-md font-medium tracking-wider truncate ${column.className} ${headerClassName}`}
                  >
                    <div
                      className={`flex items-center space-x-2 ${column.sortable ? 'cursor-pointer' : ''}`}
                      onClick={() => column.sortable && handleSort(column.key)}
                    >
                      <span>{column.label}</span>
                      {/* Sorting Icons */}
                      {column.sortable && (
                        <>
                          {sortKey === column.key && sortOrder === 'asc' && (
                            <AiOutlineArrowUp className="text-theme-brand" />
                          )}
                          {sortKey === column.key && sortOrder === 'desc' && (
                            <AiOutlineArrowDown className="text-theme-brand" />
                          )}
                          {sortKey !== column.key && <AiOutlineArrowUp className="text-theme-muted" />}
                        </>
                      )}
                    </div>
                  </th>
                ))}
                {actionsConfig.length > 0 && (
                  <th className="px-6 py-4 text-left text-md font-medium tracking-wider">Actions</th>
                )}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className={`divide-y text-theme-primary ${tbodyClass}`}>
              {paginatedData.length > 0 ? (
                paginatedData.map((row, index) => {
                  if (!getId && mode === 'select') {
                    throw Error('Select table needs getId Prop');
                  }
                  const rowId = (getId && getId(row)) ?? String(index);


                return (
                  <tr key={rowId} className={`cursor-pointer hover:bg-theme-default-hover ${rowClassName}`}>
                    {mode === 'select' && (
                      <td className="px-4 py-4 border-b-2 border-theme-default">
                        <VCheckbox
                          name={`select-${rowId}`}
                          value={rowId}
                          checked={selectedRows.has(rowId)}
                          disabled={isRowInvalid?.(row)}
                          onChange={(value, _, checked) => handleRowSelection(value, checked ?? false)}
                        />
                      </td>
                    )}
                    {columns.map((column, index) => (
                      <td
                        key={String(column.key)}
                        className={`${index === columns.length - 1 ? 'pr-3' : 'px-6'}
                         py-4 border-b-2 border-theme-default truncate ${column.className}`}
                        >
                          {column.customRender ? column.customRender(row) : (row[column.key] as React.ReactNode)}
                        </td>
                      ))}
                      {actionsConfig.length > 0 && (
                        <td className="px-6 py-4 whitespace-nowrap border-b-2 border-theme-default">
                          <div className="flex items-center pl-2 gap-2">
                            {actionsConfig.map((actionConfig) => (
                              <React.Fragment key={actionConfig.action}>
                                {actionConfig.action === 'edit' && (
                                  <div onClick={() => handleAction(rowId, 'edit')}>
                                    {actionConfig.label ?? (
                                      <VICon icon={FiEdit} size={16} className="text-theme-brand" />
                                    )}
                                  </div>
                                )}
                                {actionConfig.action === 'delete' && (
                                  <div onClick={() => handleAction(rowId, 'delete')}>
                                    {actionConfig.label ?? (
                                      <VICon icon={FaRegTrashCan} size={16} className="text-theme-negative" />
                                    )}
                                  </div>
                                )}
                              </React.Fragment>
                            ))}
                          </div>
                        </td>
                      )}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={columns.length + (actionsConfig.length > 0 ? 1 : 0)} className="text-center px-6 py-4">
                    {!loading && emptyState}
                    {loading && <VLoader type="spinner" />}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {Math.ceil(filteredData.length / itemsPerPage) > 1 && (
          <div className={`flex justify-end pt-4 ${paginationWrapperClassName}`}>
            <VPagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredData.length / itemsPerPage)}
              onpageChange={handlepageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default VTable;
