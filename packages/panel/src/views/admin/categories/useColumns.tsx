import { Category } from "@gold/api";
import { ColumnHelper } from "@tanstack/react-table";
import ColCell from "components/table/ColCell";
import ColHead from "components/table/ColHead";

export default function useCategoryColumns(columnHelper: ColumnHelper<Category>) {
  return [
    columnHelper.accessor("title", {
      id: "title",
      enableSorting: false,
      enableHiding: true,
      header: (context) => <ColHead context={context} title="عنوان" />,
      cell: (context) => <ColCell context={context} accessor="title" />
    })
  ]
}