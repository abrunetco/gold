import { User } from "@gold/api";
import { Genderypes } from "@gold/api/lib/shared/fragments/gender-types";
import { createColumnHelper } from "@tanstack/react-table";
import ColCell from "components/table/ColCell";
import ColHead from "components/table/ColHead";

const columnHelper = createColumnHelper<User>();

export default function useUserColumns() {
  return [
    columnHelper.accessor("firstName", {
      id: "firstName",
      size: 150,
      header: (context) => <ColHead context={context} title="نام" />,
      cell: (context) => <ColCell context={context} accessor="firstName" />,
    }),
    columnHelper.accessor("lastName", {
      id: "lastName",
      size: 150,
      // enableSorting: false,
      // enableColumnFilter: false,
      header: (context) => <ColHead context={context} title="فامیل" />,
      cell: (context) => <ColCell context={context} accessor="lastName" />,
    }),
    columnHelper.accessor("email", {
      id: "email",
      size: 300,
      header: (context) => <ColHead context={context} title="ایمیل" />,
      cell: (context) => <ColCell context={context} accessor="email" ltr />,
    }),
    columnHelper.accessor("gender", {
      id: "gender",
      size: 100,
      header: (context) => <ColHead context={context} title="جنسیت" />,
      cell: (context) => <ColCell context={context} accessor="gender" />,
      meta: {
        filterVariant: "select",
        options: {
          [Genderypes.MAN]: "مرد",
          [Genderypes.WOMAN]: "زن",
        },
      },
    }),
    columnHelper.accessor("isVerified", {
      id: "isVerified",
      size: 100,
      header: (context) => <ColHead context={context} title="تایید شده" />,
      cell: (context) => <ColCell context={context} accessor="isVerified" />,
      meta: {
        filterVariant: "select",
        options: {
          true: "تایید شده",
          false: "در انتظار",
        },
      },
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
  ];
}
