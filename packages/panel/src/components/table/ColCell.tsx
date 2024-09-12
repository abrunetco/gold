import { CellContext, RowData } from "@tanstack/react-table";
import { ReactNode } from "react";

declare module '@tanstack/react-table' {
  //allows us to define custom properties for our columns
  interface ColumnMeta<TData extends RowData, TValue> {
    options?: { [k: string]: ReactNode }
    format?: 'date' | 'currency'
  }
}

interface ColCellProps<TData, TValue> {
  context: CellContext<TData, TValue>
  accessor: string
  ltr?: true
}

export default function ColCell<TData, TValue extends ReactNode>({ context, ltr, accessor }: ColCellProps<TData, TValue>) {
  const raw = String(context.getValue())
  let value: ReactNode = raw
  const options = context.column.columnDef.meta?.options
  const format = context.column.columnDef.meta?.format
  if (options) {
    value = options[raw] ?? options['default']
  } else if (format === 'date') {
    value = new Date(+value).toLocaleDateString('fa-IR', {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: 'numeric',
      minute: 'numeric',
    })
  }
  
  return (
    <span dir={ltr ? "ltr" : 'rtl'} className="text-sm text-navy-700 dark:text-white overflow-hidden w-full flex-1 overflow-ellipsis text-nowrap">
      {value}
    </span>
  )
}