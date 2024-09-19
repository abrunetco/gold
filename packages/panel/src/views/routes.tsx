// Admin Imports
import MainDashboard from "views/admin/dashboard";
import MainDashboard2 from "views/admin/dashboard/index2";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import Profile2 from "views/admin/profile/index2";
// import RTLDefault from "views/rtl/default";

// Auth Imports

// Icon Imports
import {
  MdBarChart,
  MdHome,
  MdOutlineShoppingCart,
  MdPerson,
} from "react-icons/md";
import CategoriesGridTable from "views/admin/categories";
import UsersView from "views/admin/users";
import UserDetails from "views/admin/users/UserDetails";

const routes = [
  {
    name: "پیشخوان",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "پیشخوان ۲",
    layout: "/admin",
    path: "default2",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard2 />,
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
    icon: <MdPerson className="h-6 w-6" />,
    path: "users",
    component: <UsersView />,
  },
  {
    name: "کاربر",
    icon: <MdPerson className="h-6 w-6" />,
    layout: "/admin/users",
    path: ":uid",
    component: <UserDetails />,
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
  {
    name: "پروفایل ۲",
    layout: "/admin",
    path: "profile2",
    icon: <MdPerson className="h-6 w-6" />,
    component: <Profile2 />,
  },
];
export default routes;
