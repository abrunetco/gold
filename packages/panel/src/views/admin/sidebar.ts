// Admin Imports
// import RTLDefault from "views/rtl/default";

import { LinkType } from "components/sidebar/components/Links";
import { MdPerson, MdBarChart, MdHome } from "react-icons/md";

// Auth Imports

// Icon Imports

export const sidebarLinks: LinkType[] = [
  {
    name: "پیشخوان",
    path: "/admin/",
    Icon: MdHome,
  },
  // {
  //   name: "فروشگاه",
  //   path: "/admin/market",
  //   Icon: MdOutlineShoppingCart,
  // },
  {
    name: "کاربران",
    Icon: MdPerson,
    path: "/admin/users",
  },
  {
    name: "دسته‌بندی‌ها",
    Icon: MdBarChart,
    path: "/admin/categories",
  },
];
