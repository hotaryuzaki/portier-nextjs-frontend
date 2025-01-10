import React, { useMemo } from 'react';
import { useTable } from 'react-table';

const KeyTable = ({ columns = [], data = [], offset = 0, onDelete }: any) => {
  const memoizedColumns = useMemo(() => [
    {
      Header: 'No',
      Cell: ({ row }: any) => row.index + offset + 1,
    },
    ...columns,
    {
      Header: 'Actions',
      Cell: ({ row }: any) => (
        <button
          onClick={() => onDelete(row.original.id)}
          className="text-red-600 hover:text-red-900"
        >
          Delete
        </button>
      ),
    },
  ], [columns, offset]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns: memoizedColumns,
    data,
  });

  return (
    <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        {headerGroups.map(headerGroup => {
          const { key, ...restHeaderProps } = headerGroup.getHeaderGroupProps();
          return (
            <tr {...restHeaderProps} key={key}>
              {headerGroup.headers.map(column => {
                const { key, ...restColumnProps } = column.getHeaderProps();
                return (
                  <th
                    {...restColumnProps}
                    key={key}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.render('Header')}
                  </th>
                );
              })}
            </tr>
          );
        })}
      </thead>
      <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
        {rows.map(row => {
          prepareRow(row);
          const { key, ...restRowProps } = row.getRowProps();
          return (
            <tr {...restRowProps} key={key}>
              {row.cells.map(cell => {
                const { key, ...restCellProps } = cell.getCellProps();
                return (
                  <td
                    {...restCellProps}
                    key={key}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default KeyTable;
