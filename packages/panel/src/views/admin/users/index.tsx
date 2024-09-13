import Card from "components/card";
import React from "react";

import { User, userPath } from "@gold/api";
import {
  ColumnFiltersState,
  ColumnOrderState,
  createColumnHelper,
  getCoreRowModel,
  SortingState,
  useReactTable
} from "@tanstack/react-table";
import TanstackTable from "components/table/TanstackTable";
import ColumnsMenu from "components/table/ColumnsMenu";
import { MARKUP_MAP } from "variables/entities";
import useUserColumns from "./useColumns";
import useUserQuery from "./useQuery";
import Icon from "components/icons";

const columnHelper = createColumnHelper<User>();

function UsersGridTable() {
  const rerender = React.useReducer(() => ({}), {})[1]
  const columns = useUserColumns(columnHelper);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filters, setFilters] = React.useState<ColumnFiltersState>([])

  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [columnOrder, setColumnOrder] = React.useState<ColumnOrderState>([])

  const query = useUserQuery(sorting, filters)

  const flatData = React.useMemo<Array<User | undefined>>(
    () => (query.data?.pages ?? []).flatMap(page => page.data),
    [query.data]
  )

  const fetchMoreOnEdgeReached = React.useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      const pages = query.data?.pages ?? []
      const pagesSize = pages.length ?? 0
      const total = pages[0]?.total ?? 0
      const limit = pages[0]?.limit ?? 10
      const firstPageSkip = pages[0]?.skip ?? 0
      const lastPageSkip = pages[pagesSize - 1]?.skip ?? 0
      const hasPrevious = firstPageSkip > 0
      const hasNext = lastPageSkip + limit < total
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement
        const scrollBottom = scrollHeight - scrollTop - clientHeight
        if (scrollBottom < 10) {
          if (!query.isFetching && hasNext) query.fetchNextPage()
        } else if (scrollTop < 10 ) {
          if (!query.isFetching && hasPrevious) query.fetchPreviousPage()
        }
      }
    },
    [query]
  )

  const table = useReactTable({
    data: flatData,
    columns,
    state: {
      sorting,
      columnVisibility,
      columnOrder,
    },
    defaultColumn: {
      size: 200
    },
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    rowCount: flatData.length,
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    onSortingChange: setSorting,
    // manualPagination: true,
    // onPaginationChange: setPagination,
    manualFiltering: true,
    onColumnFiltersChange: setFilters,
    maxMultiSortColCount: 2,
    debugTable: true,
  });

  return (
    <Card extra="w-full pb-10 p-4 h-full">
      <header className="relative flex items-center justify-between mb-2">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          {MARKUP_MAP[userPath].polar}
        </div>
        <div className="flex gap-2 flex-row-reverse">
          <ColumnsMenu table={table} />

          <button
            onClick={rerender}
            className={`flex items-center text-xl hover:cursor-pointer bg-lightPrimary p-2 text-brand-500 hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10 linear justify-center rounded-lg font-bold transition duration-200`}
          >
            <Icon name="Reload" />
          </button>
        </div>
      </header>

      <TanstackTable table={table} fetchMore={fetchMoreOnEdgeReached} />
    </Card>
  );
}

export default UsersGridTable;
