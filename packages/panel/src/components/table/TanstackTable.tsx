import { flexRender, Table } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef } from "react";
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

  const indexColumnWidth = ~~(Math.log10(rows.length) * 10) + 15;

  return (
    <div
      ref={ref}
      onScroll={(e) => fetchMore(e.target as HTMLDivElement)}
      className="relative h-[600px] overflow-auto"
    >
      <table className="w-full">
        <thead className="sticky top-0 z-[1] grid bg-white dark:!bg-navy-800 dark:text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="!border-px flex w-full !border-gray-400"
            >
              <th
                className="flex border-b border-gray-200 pb-2 pe-4 pt-4 text-start"
                style={{ width: indexColumnWidth }}
              >
                #
              </th>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    onClick={header.column.getToggleSortingHandler()}
                    className="flex border-b border-gray-200 pb-2 pe-4 pt-4 text-start"
                    style={{ width: header.getSize() }}
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
                <td
                  className="flex overflow-hidden border-white/0 py-3 pe-4"
                  style={{
                    width: indexColumnWidth,
                  }}
                >
                  {(virtualRow.index + 1).toLocaleString("fa-IR")}
                </td>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className="flex overflow-hidden border-white/0 py-3 pe-4"
                      style={{
                        width: cell.column.getSize(),
                      }}
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
