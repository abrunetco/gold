import Card from "components/card";
import React from "react";

import { User, userPath } from "@gold/api";
import {
  ColumnFiltersState,
  ColumnOrderState,
  getCoreRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import TanstackTable from "components/table/TanstackTable";
import ColumnsMenu from "components/table/ColumnsMenu";
import useUserColumns from "./useColumns";
import useUserQuery from "./useQuery";
import Icon from "components/icons";
import { TableContext } from "providers/table";
import { MARKUP_MAP } from "variables/entities";

export default function UsersGridTable() {
  const columns = useUserColumns();
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [filters, setFilters] = React.useState<ColumnFiltersState>([]);
  const [visibility, setVisibility] = React.useState<VisibilityState>({});
  const [order, setOrder] = React.useState<ColumnOrderState>([]);

  const query = useUserQuery(sorting, filters);

  const flatData = React.useMemo<Array<User | undefined>>(
    () => (query.data?.pages ?? []).flatMap((page) => page.data),
    [query.data],
  );

  const fetchMoreOnEdgeReached = React.useCallback(
    (containerRefElement?: HTMLDivElement | null) => {
      const pages = query.data?.pages ?? [];
      const pagesSize = pages.length ?? 0;
      const total = pages[0]?.total ?? 0;
      const limit = pages[0]?.limit ?? 10;
      const firstPageSkip = pages[0]?.skip ?? 0;
      const lastPageSkip = pages[pagesSize - 1]?.skip ?? 0;
      const hasPrevious = firstPageSkip > 0;
      const hasNext = lastPageSkip + limit < total;
      if (containerRefElement) {
        const { scrollHeight, scrollTop, clientHeight } = containerRefElement;
        const scrollBottom = scrollHeight - scrollTop - clientHeight;
        if (scrollBottom < 10) {
          if (!query.isFetching && hasNext) query.fetchNextPage();
        } else if (scrollTop < 10) {
          if (!query.isFetching && hasPrevious) query.fetchPreviousPage();
        }
      }
    },
    [query],
  );

  const table = useReactTable({
    data: flatData,
    columns,
    state: {
      sorting,
      columnVisibility: visibility,
      columnOrder: order,
      columnPinning: {
        right: ["controls"],
        left: ["index"],
      },
    },
    defaultColumn: {
      size: 200,
    },
    onColumnVisibilityChange: setVisibility,
    onColumnOrderChange: setOrder,
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
    <Card className="grid h-full w-full grid-rows-[40px_auto] gap-2 p-4">
      <header className="relative flex items-center justify-between">
        <div className="text-xl font-bold text-navy-700 dark:text-white">
          {MARKUP_MAP[userPath].polar}
        </div>
        {/* <Tabs
            aria-label="Default tabs"
            variant="underline"
            className="mb-0 flex-1 pb-0"
            ref={tabsRef}
            onActiveTabChange={(tab) => setActiveTab(tab)}
            theme={{ tabpanel: "", base: "" }}
          >
            <Tabs.Item title="فعال" active />
            <Tabs.Item title="آرشیو" />
            <Tabs.Item title="+" />
          </Tabs> */}
        <div className="flex flex-row-reverse gap-2">
          <ColumnsMenu table={table} />

          <button
            onClick={() => query.refetch()}
            disabled={query.isLoading}
            className="linear flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-xl font-bold text-brand-500 transition duration-200 hover:cursor-pointer hover:bg-gray-100 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10"
          >
            <span className={query.isLoading ? "animate-spin" : ""}>
              <Icon name="Reload" />
            </span>
          </button>
        </div>
      </header>
      <div className="h-full w-full overflow-auto">
        <TableContext.Provider value={table}>
          <TanstackTable table={table} fetchMore={fetchMoreOnEdgeReached} />
        </TableContext.Provider>
      </div>
    </Card>
  );
}
