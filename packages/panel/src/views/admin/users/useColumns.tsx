import { User } from "@gold/api";
import { ColumnHelper } from "@tanstack/react-table";
import CellWrapper from "components/table/components/CellWrapper";
import ColumnHeaderLable from "components/table/components/ColumnHeaderLable";

export default function useUserColumns(columnHelper: ColumnHelper<User>) {
  return [
    columnHelper.accessor("firstName", {
      id: "firstName",
      enableSorting: false,
      enableHiding: true,
      header: () => <ColumnHeaderLable>نام</ColumnHeaderLable>,
      cell: (info: any) => <CellWrapper>{info.getValue()}</CellWrapper>,
    }),
    columnHelper.accessor("lastName", {
      id: "lastName",
      enableSorting: false,
      header: () => <ColumnHeaderLable>فامیل</ColumnHeaderLable>,
      cell: (info: any) => <CellWrapper>{info.getValue()}</CellWrapper>,
    }),
    columnHelper.accessor("email", {
      id: "email",
      enableMultiSort: true,
      header: () => <ColumnHeaderLable>نام</ColumnHeaderLable>,
      cell: (info: any) => <CellWrapper>{info.getValue()}</CellWrapper>,
    }),
    columnHelper.accessor("gender", {
      id: "gender",
      enableMultiSort: true,
      header: () => <ColumnHeaderLable>جنسیت</ColumnHeaderLable>,
      cell: (info: any) => <CellWrapper>{info.getValue()}</CellWrapper>,
    }),
    columnHelper.accessor("isVerified", {
      id: "isVerified",
      header: () => <ColumnHeaderLable>تایید شده</ColumnHeaderLable>,
      cell: (info: any) => <CellWrapper>{info.getValue()}</CellWrapper>,
    }),
    columnHelper.accessor("createdAt", {
      id: "createdAt",
      header: () => <ColumnHeaderLable>تایید شده</ColumnHeaderLable>,
      cell: (info: any) => <CellWrapper>{info.getValue()}</CellWrapper>,
    }),
  ]
}