// Admin Imports
// import RTLDefault from "views/rtl/default";

import { balancePath, categoryPath, userPath } from "@gold/api";
import { LinkType } from "components/sidebar/components/Links";
import {
  MdPerson,
  MdBarChart,
  MdHome,
  MdBalance,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { MARKUP_MAP } from "variables/entities";

// Auth Imports

// Icon Imports

export const sidebarLinks: LinkType[] = [
  {
    name: "پیشخوان",
    path: "/admin/",
    Icon: MdHome,
  },
  {
    name: "گالری",
    path: "/admin/market",
    Icon: MdOutlineShoppingCart,
  },
  {
    name: MARKUP_MAP[userPath].polar,
    Icon: MdPerson,
    path: "/admin/users",
  },
  {
    name: MARKUP_MAP[balancePath].polar,
    Icon: MdBalance,
    path: "/admin/balances",
  },
  {
    name: MARKUP_MAP[categoryPath].polar,
    Icon: MdBarChart,
    path: "/admin/categories",
  },
];
