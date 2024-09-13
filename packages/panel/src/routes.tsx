import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
// import RTLDefault from "views/rtl/default";

// Auth Imports

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
} from "react-icons/md";
import UsersGridTable from "views/admin/users";
import CategoriesGridTable from "views/admin/categories";

const routes = [
  {
    name: "پیشخوان",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "فروشگاه",
    layout: "/admin",
    path: "market",
    icon: <MdOutlineShoppingCart className="h-6 w-6" />,
    component: <NFTMarketplace />,
    secondary: true,
  },
  {
    name: "کاربران",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "users",
    component: <UsersGridTable />,
  },
  {
    name: "دسته‌بندی‌ها",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "categories",
    component: <CategoriesGridTable />,
  },
  {
    name: "پروفایل",
    layout: "/admin",
    path: "profile",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile />,
  },
];
export default routes;
