import { Column, flexRender, Table } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { CSSProperties, useEffect, useRef } from "react";
import ColHeadControl from "./components/ColHeadControl";
import { Common } from "@gold/api";

interface TanstackTableProps<T extends Common> {
  table: Table<T>;
  fetchMore: (elem?: HTMLDivElement | null) => void;
}

export default function TanstackTable<T extends Common>({
  table,
  fetchMore,
}: TanstackTableProps<T>) {
  const ref = useRef<HTMLDivElement>(null);
  const { rows } = table.getRowModel();
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 33, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => ref.current,
    //measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  });

  useEffect(() => {
    fetchMore(ref.current);
  }, [fetchMore]);

  const height = rowVirtualizer.getTotalSize();

  return (
    <div
      ref={ref}
      onScroll={(e) => fetchMore(e.target as HTMLDivElement)}
      className="relative h-[calc(100vh-190px)] overflow-auto"
    >
      <table className="w-full">
        <thead className="sticky top-0 z-[1] grid bg-white dark:!bg-navy-800 dark:text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="!border-px flex w-full !border-gray-400"
            >
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    onClick={header.column.getToggleSortingHandler()}
                    className="flex border-b border-gray-200 px-2 pb-2 pt-4 text-start"
                    style={{ width: header.column.getSize() }}
                  >
                    <ColHeadControl header={header} />
                  </th>
                );
              })}
              <th className="flex flex-1"></th>
            </tr>
          ))}
        </thead>
        <tbody className="relative grid" style={{ height }}>
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = rows[virtualRow.index];
            return (
              <tr
                data-index={virtualRow.index} //needed for dynamic row height measurement
                ref={(node) => rowVirtualizer.measureElement(node)} //measure dynamic row height
                key={row.id}
                className="absolute flex w-full"
                style={{
                  transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
                }}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className="flex overflow-hidden bg-white/50 px-2 pb-2 pt-4 backdrop-blur-md dark:bg-navy-700/50"
                      style={getCommonPinningStyles(cell.column)}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  );
                })}
                <td className="flex flex-1"></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function getCommonPinningStyles<T>(column: Column<T>): CSSProperties {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  return {
    boxShadow: isLastLeftPinnedColumn
      ? "4px 0 4px -4px lightgray inset"
      : isFirstRightPinnedColumn
        ? "-4px 0 4px -4px lightgray inset"
        : undefined,
    left: isPinned === "right" ? `${column.getStart("right")}px` : undefined,
    right: isPinned === "left" ? `${column.getAfter("left")}px` : undefined,
    position: isPinned ? "sticky" : "relative",
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  };
}
