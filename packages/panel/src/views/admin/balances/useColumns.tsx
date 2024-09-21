import { Balance } from "@gold/api";
import { createColumnHelper } from "@tanstack/react-table";
import ColCell from "components/table/ColCell";
import ColHead from "components/table/ColHead";
import RowControls from "./RowControls";

const columnHelper = createColumnHelper<Balance>();

export default function useBalanceColumns() {
  return [
    columnHelper.accessor("uid", {
      id: "index",
      size: 50,
      enableColumnFilter: false,
      header: "",
      cell: (context) => (context.row.index + 1).toLocaleString("fa-IR"),
    }),
    columnHelper.accessor("stringified", {
      id: "number",
      size: 150,
      header: (context) => <ColHead context={context} title="شماره" />,
      cell: (context) => <ColCell context={context} accessor="stringified" />,
    }),
    columnHelper.accessor("value", {
      id: "value",
      size: 150,
      // enableSorting: false,
      // enableColumnFilter: false,
      header: (context) => <ColHead context={context} title="بستانکاری" />,
      cell: (context) => <ColCell context={context} accessor="value" />,
      meta: {
        format: "currency",
      },
    }),
    columnHelper.accessor("user", {
      id: "user",
      size: 200,
      header: (context) => <ColHead context={context} title="کاربر" />,
      cell: (context) => <ColCell context={context} accessor="userLabel" />,
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      header: (context) => <ColHead context={context} title="ت.‌ثبت" />,
      cell: (context) => <ColCell context={context} accessor="createdAt" />,
      meta: {
        filterVariant: "date-range",
        format: "date",
      },
    }),
    columnHelper.accessor("uid", {
      id: "controls",
      size: 50,
      enableColumnFilter: false,
      header: (context) => <ColHead context={context} title="" />,
      cell: (context) => <RowControls context={context} accessor="createdAt" />,
    }),
  ];
}
