import { Category } from "@gold/api";
import { createColumnHelper } from "@tanstack/react-table";
import ColCell from "components/table/ColCell";
import ColHead from "components/table/ColHead";

const columnHelper = createColumnHelper<Category>();

export default function useCategoryColumns() {
  return [
    columnHelper.accessor("title", {
      id: "title",
      enableSorting: false,
      enableHiding: true,
      header: (context) => <ColHead context={context} title="عنوان" />,
      cell: (context) => <ColCell context={context} accessor="title" />,
    }),
  ];
}
