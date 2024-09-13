import React from "react";
import CardMenu from "components/card/CardMenu";
import Card from "components/card";

import {
  ColumnFiltersState,
  createColumnHelper,
  getCoreRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Category } from "@gold/api";
import useCategoryColumns from "./useColumns";
import useCategoryQuery from "./useQuery";
import TanstackTable from "components/table/TanstackTable";
import TsPagination from "components/table/Pagination";
import { categoryPath } from "@gold/api";
import { MARKUP_MAP } from "variables/entities";

const columnHelper = createColumnHelper<Category>();


const defaultData: Category[] = []

function CategoriesGridTable() {
  const rerender = React.useReducer(() => ({}), {})[1]
  const columns = useCategoryColumns(columnHelper);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filters, setFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const query = useCategoryQuery(pagination, sorting, filters)
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
          {MARKUP_MAP[categoryPath].polar}
        </div>
        <CardMenu />
      </header>

      <div className="mt-4 overflow-x-scroll xl:overflow-x-hidden">
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

export default CategoriesGridTable;
