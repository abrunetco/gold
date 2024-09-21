// Admin Imports
// import RTLDefault from "views/rtl/default";

import { MdOutlineShoppingCart, MdPerson, MdHome } from "react-icons/md";
import { LinkType } from "./components/Links";

// Auth Imports

// Icon Imports

export const sidebarExtraLinks: LinkType[] = [
  {
    name: "پیشخوان ۲",
    path: "/admin/default",
    Icon: MdHome,
  },
  {
    name: "فروشگاه ۲",
    path: "/admin/marketplace",
    Icon: MdOutlineShoppingCart,
  },
  {
    name: "پروفایل ۲",
    path: "/admin/profile2",
    Icon: MdPerson,
  },
];
