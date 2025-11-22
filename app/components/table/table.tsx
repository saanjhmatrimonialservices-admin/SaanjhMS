// components/dashboard/table/Table.tsx
import React, { useState, useMemo } from "react";

export interface ColumnDef<T> {
  key: string;
  header: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  accessor?: (row: T) => any;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
  sortKey?: string;
}

interface TableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  pageSizeOptions?: number[];
  initialPageSize?: number;
  filterable?: boolean;
  onFilterChange?: (filter: string) => void;
  externalFilter?: string;
  totalItems?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  onSortChange?: (sortBy: string | null, sortOrder: "asc" | "desc") => void;
  externalSortBy?: string | null;
  externalSortOrder?: "asc" | "desc";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Table<T extends Record<string, any>>({
  data,
  columns,
  onEdit,
  onDelete,
  pageSizeOptions = [5, 10, 20, 50],
  initialPageSize = 10,
  filterable = false,
  onFilterChange,
  externalFilter,
  totalItems,
  onPageChange,
  onPageSizeChange,
  onSortChange,
  externalSortBy,
  externalSortOrder,
}: TableProps<T>) {
  const [internalFilter, setInternalFilter] = useState("");
  const [internalSortBy, setInternalSortBy] = useState<string | null>(null);
  const [internalSortOrder, setInternalSortOrder] = useState<"asc" | "desc">(
    "asc"
  );
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [page, setPage] = useState(1);

  const isControlled = totalItems !== undefined;
  const filter = externalFilter !== undefined ? externalFilter : internalFilter;
  const sortBy = externalSortBy !== undefined ? externalSortBy : internalSortBy;
  const sortOrder =
    externalSortOrder !== undefined ? externalSortOrder : internalSortOrder;

  const filteredData = useMemo(() => {
    if (!filterable || !filter || isControlled) return data;

    const lowerFilter = filter.toLowerCase();
    return data.filter((row) => {
      return columns.some((col) => {
        const value = col.accessor ? col.accessor(row) : row[col.key];
        return String(value || "")
          .toLowerCase()
          .includes(lowerFilter);
      });
    });
  }, [data, filter, filterable, isControlled, columns]);

  const sortedData = useMemo(() => {
    if (!Array.isArray(filteredData)) return [];
    if (isControlled) return filteredData;

    const copy = [...filteredData];
    if (!sortBy) return copy;

    const column = columns.find(
      (col) => col.key === sortBy || col.sortKey === sortBy
    );
    if (!column) return copy;

    return copy.sort((a, b) => {
      const valA = column.accessor
        ? column.accessor(a)
        : a[column.sortKey || column.key];
      const valB = column.accessor
        ? column.accessor(b)
        : b[column.sortKey || column.key];

      if (valA === null || valA === undefined) return 1;
      if (valB === null || valB === undefined) return -1;
      if (valA === valB) return 0;

      const result = valA > valB ? 1 : -1;
      return sortOrder === "asc" ? result : -result;
    });
  }, [filteredData, sortBy, sortOrder, isControlled, columns]);

  const paginatedData = isControlled
    ? sortedData
    : sortedData.slice((page - 1) * pageSize, page * pageSize);

  const total = isControlled ? totalItems || 0 : sortedData.length;
  const totalPages = Math.ceil(total / pageSize);

  const handleFilterChange = (value: string) => {
    if (onFilterChange) {
      onFilterChange(value);
    } else {
      setInternalFilter(value);
    }
    setPage(1);
  };

  const toggleSort = (columnKey: string) => {
    const column = columns.find((col) => col.key === columnKey);
    if (!column || column.sortable === false) return;

    const newSortBy = column.sortKey || columnKey;
    let newSortOrder: "asc" | "desc" = "asc";

    if (sortBy === newSortBy) {
      newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    }

    if (onSortChange) {
      onSortChange(newSortBy, newSortOrder);
    } else {
      setInternalSortBy(newSortBy);
      setInternalSortOrder(newSortOrder);
    }
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    if (onPageChange) {
      onPageChange(newPage);
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
    if (onPageSizeChange) {
      onPageSizeChange(newPageSize);
    }
  };

  return (
    <div className="w-full">
      {filterable && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={filter}
            onChange={(e) => handleFilterChange(e.target.value)}
            className="w-full md:w-64 px-4 py-2 border border-greyshade rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-blackshade bg-whiteshade"
          />
        </div>
      )}

      <div className="overflow-auto border rounded-lg border-greyshade mb-4 bg-whiteshade">
        <table className="min-w-full text-sm text-left text-blackshade">
          <thead className="bg-primary text-whiteshade text-xs uppercase">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable !== false && toggleSort(col.key)}
                  className={`px-4 py-3 whitespace-nowrap ${
                    col.sortable !== false
                      ? "cursor-pointer hover:bg-red-800"
                      : ""
                  }`}>
                  <div className="flex items-center gap-2">
                    {col.header}
                    {col.sortable !== false &&
                      sortBy === (col.sortKey || col.key) && (
                        <span className="text-sm">
                          {sortOrder === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                  </div>
                </th>
              ))}
              {(onEdit || onDelete) && <th className="px-4 py-3">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (onEdit || onDelete ? 1 : 0)}
                  className="px-4 py-8 text-center text-blackshade">
                  No data available
                </td>
              </tr>
            ) : (
              paginatedData.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-greyshade hover:bg-greyshade/20 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="px-4 py-3">
                      {col.render
                        ? col.render(row)
                        : col.accessor
                        ? String(col.accessor(row) || "")
                        : String(row[col.key] || "")}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="px-4 py-3 space-x-2">
                      {onEdit && (
                        <button
                          className="text-primary hover:text-red-800 transition-colors"
                          onClick={() => onEdit(row)}>
                          Edit
                        </button>
                      )}
                      {onDelete && (
                        <button
                          className="text-red-600 hover:text-red-800 transition-colors"
                          onClick={() => onDelete(row)}>
                          Delete
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-blackshade">
        <div className="text-sm">
          Showing {paginatedData.length === 0 ? 0 : (page - 1) * pageSize + 1}{" "}
          to {Math.min(page * pageSize, total)} of {total} entries
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm">Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => handlePageSizeChange(Number(e.target.value))}
              className="border border-greyshade px-3 py-1 rounded-lg text-sm bg-whiteshade text-blackshade focus:outline-none focus:ring-2 focus:ring-primary">
              {pageSizeOptions.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => handlePageChange(page - 1)}
              className="px-4 py-2 border border-greyshade rounded-lg bg-whiteshade text-blackshade hover:bg-greyshade transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Prev
            </button>
            <span className="text-sm px-2">
              Page {page} of {totalPages || 1}
            </span>
            <button
              disabled={page >= totalPages}
              onClick={() => handlePageChange(page + 1)}
              className="px-4 py-2 border border-greyshade rounded-lg bg-whiteshade text-blackshade hover:bg-greyshade transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
