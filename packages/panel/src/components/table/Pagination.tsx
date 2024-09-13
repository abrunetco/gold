import { Table } from "@tanstack/react-table";
import Button from "components/button";

interface TsPaginationProps<T> {
  table: Table<T>;
  loading: boolean;
  total: number;
  refresh?: () => any;
}

export default function TsPagination<T>({
  table,
  loading,
  total,
  refresh,
}: TsPaginationProps<T>) {
  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </Button>
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </Button>
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </Button>
        <Button
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </Button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | پرش به:
          <input
            type="number"
            min="1"
            max={table.getPageCount()}
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="w-16 rounded border p-1"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              نمایش {pageSize}
            </option>
          ))}
        </select>
        {loading ? "Loading..." : null}
        <div className="mx-auto">
          نمایش {table.getRowModel().rows.length.toLocaleString()} رکورد از{" "}
          {total.toLocaleString()}
        </div>
        {refresh && (
          <div>
            <Button onClick={refresh}>Force Rerender</Button>
          </div>
        )}
      </div>
    </>
  );
}
