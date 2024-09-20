import { CellContext, RowData } from "@tanstack/react-table";
import { ReactNode } from "react";
import cn from "utils/cn";
import { BalanceFormatter } from "utils/formatters";

declare module "@tanstack/react-table" {
  //allows us to define custom properties for our columns
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData extends RowData, TValue> {
    options?: { [k: string]: ReactNode };
    format?: "date" | "currency";
  }
}

interface ColCellProps<TData, TValue> {
  context: CellContext<TData, TValue>;
  accessor: string;
  ltr?: true;
}

export default function ColCell<TData, TValue extends ReactNode>({
  context,
  accessor,
  ltr,
}: ColCellProps<TData, TValue>) {
  const data: any = context.row.original;
  const raw = data[accessor] ?? context.getValue();
  const str = String(raw);
  let value: ReactNode = str;
  const options = context.column.columnDef.meta?.options;
  const format = context.column.columnDef.meta?.format;
  if (options) {
    value = options[str] ?? options["default"];
  } else if (format === "date") {
    value = new Date(+value).toLocaleDateString("fa-IR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  } else if (format === "currency") {
    value = BalanceFormatter.format(+raw);
    value = (
      <span
        dir="ltr"
        className={cn(
          "text-end",
          +raw >= 0
            ? "text-green-700 dark:text-gray-400"
            : "text-red-700 dark:text-red-400",
        )}
      >
        {value}
      </span>
    );
  }

  return (
    <span
      dir={ltr ? "ltr" : "rtl"}
      className="w-full flex-1 overflow-hidden overflow-ellipsis text-nowrap text-sm text-navy-700 dark:text-white"
    >
      {value}
    </span>
  );
}
