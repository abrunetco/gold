import React from "react";
import CardMenu from "components/card/CardMenu";
import Card from "components/card";

import {
  Column,
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { User } from "@gold/api";
import useUserColumns from "./useColumns";
import useUserQuery from "./useQuery";
import TanstackTable from "components/table";
import TsPagination from "components/table/Pagination";

const columnHelper = createColumnHelper<User>();


const defaultData: User[] = []

function UsersGridTable(props: { tableData?: any[] }) {
  const rerender = React.useReducer(() => ({}), {})[1]
  const columns = useUserColumns(columnHelper);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filters, setFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const query = useUserQuery(pagination, sorting, filters)
  const table = useReactTable({
    data: query.data?.data ?? defaultData,
    columns,
    state: {
      pagination,
      sorting,
    },
    rowCount: query.data?.data.length ?? 0,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    onSortingChange: setSorting,
    manualSorting: true,
    onPaginationChange: setPagination,
    manualFiltering: true,
    onColumnFiltersChange: setFilters,
    maxMultiSortColCount: 2,
    debugTable: true,
  });
  return (
    <Card extra={"w-full pb-10 p-4 h-full"}>
      <header className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          کاربران
        </div>
        <CardMenu />
      </header>

      <div className="mt-8 overflow-x-scroll xl:overflow-x-hidden">
        <TanstackTable table={table} />
      </div>
      <div className="h-2" />
      <TsPagination
        table={table}
        loading={query.isLoading}
        total={query.data?.total ?? 0}
        refresh={() => rerender()}
      />
    </Card>
  );
}

export default UsersGridTable;
