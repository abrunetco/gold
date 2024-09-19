import { User } from "@gold/api";
import { Genderypes } from "@gold/api/lib/shared/fragments/gender-types";
import { createColumnHelper } from "@tanstack/react-table";
import ColCell from "components/table/ColCell";
import ColHead from "components/table/ColHead";
import RowControls from "./RowControls";
import {
  ROLETYPE_MAP,
  RoleTypes,
} from "@gold/api/lib/shared/fragments/role-types";

const columnHelper = createColumnHelper<User>();

export default function useUserColumns() {
  return [
    columnHelper.accessor("uid", {
      id: "index",
      size: 50,
      enableColumnFilter: false,
      header: "",
      cell: (context) => (context.row.index + 1).toLocaleString("fa-IR"),
    }),
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
    columnHelper.accessor("role", {
      id: "role",
      size: 100,
      header: (context) => <ColHead context={context} title="نقش" />,
      cell: (context) => <ColCell context={context} accessor="role" />,
      meta: {
        filterVariant: "select",
        options: {
          [RoleTypes.ADMIN]: ROLETYPE_MAP.ADMIN.label,
          [RoleTypes.USER]: ROLETYPE_MAP.USER.label,
          [RoleTypes.CUSTOMER]: ROLETYPE_MAP.CUSTOMER.label,
        },
      },
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
    columnHelper.accessor("uid", {
      id: "controls",
      size: 50,
      enableColumnFilter: false,
      header: (context) => <ColHead context={context} title="" />,
      cell: (context) => <RowControls context={context} accessor="createdAt" />,
    }),
  ];
}
