import { flexRender, Table } from "@tanstack/react-table";
import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useRef } from "react";
import ColHeadControl from "./components/ColHeadControl";
import { Common } from "@gold/api"

interface TanstackTableProps<T extends Common> {
  table: Table<T>
  fetchMore: (elem?: HTMLDivElement | null) => void
}
export default function TanstackTable<T extends Common>({ table, fetchMore }: TanstackTableProps<T>) {
  const ref = useRef<HTMLDivElement>(null)
  const { rows } = table.getRowModel()
  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    estimateSize: () => 33, //estimate row height for accurate scrollbar dragging
    getScrollElement: () => ref.current,
    //measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== 'undefined' &&
      navigator.userAgent.indexOf('Firefox') === -1
        ? element => element?.getBoundingClientRect().height
        : undefined,
    overscan: 5,
  })

  useEffect(() => {
    fetchMore(ref.current)
  }, [fetchMore])

  const height = rowVirtualizer.getTotalSize()

  const indexColumnWidth = ~~(Math.log10(rows.length) * 10) + 15

  return (
    <div ref={ref} onScroll={e => fetchMore(e.target as HTMLDivElement)} className="overflow-auto relative h-[600px]">
      <table className="w-full">
        <thead className="grid sticky top-0 z-[1] bg-white dark:!bg-navy-800 dark:text-white">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="!border-px !border-gray-400 w-full flex">
              <th
              className="border-b border-gray-200 pb-2 pe-4 pt-4 text-start flex overflow-hidden"
              style={{ width: indexColumnWidth }}
              >#</th>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    onClick={header.column.getToggleSortingHandler()}
                    className="border-b border-gray-200 pb-2 pe-4 pt-4 text-start flex overflow-hidden flex-1"
                    style={{ width: header.getSize() }}
                  >
                    <ColHeadControl header={header} />
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="grid relative" style={{ height }}>
          {rowVirtualizer.getVirtualItems().map(virtualRow => {
            const row = rows[virtualRow.index]
            return (
              <tr
                data-index={virtualRow.index} //needed for dynamic row height measurement
                ref={node => rowVirtualizer.measureElement(node)} //measure dynamic row height
                key={row.id}
                className="flex absolute w-full"
                style={{
                  transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
                }}
              >
                <td
                  className="flex border-white/0 py-3 pe-4 overflow-hidden"
                  style={{
                    width: indexColumnWidth
                  }}
                >
                  {virtualRow.index + 1}
                </td>
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className="flex border-white/0 py-3 pe-4 flex-1 overflow-hidden"
                      style={{
                        width: cell.column.getSize()
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  );
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

