import { RRDErrorBoundary } from "components/brand/errors";
import { createBrowserRouter } from "react-router-dom";
import Dashboard2 from "views/admin/dashboard/index2";
import ProfileOverview from "views/admin/profile/index2";
import AuthLayout from "views/auth/Layout";
import { authLoader } from "views/auth/loader";
import SignInView from "views/auth/SignIn";
import TestView from "views/test";

const router = createBrowserRouter([
  {
    path: "/admin/*",
    lazy: () => import("views/admin/lazy"),
    errorElement: <div>error?</div>,
    children: [
      {
        path: "",
        lazy: () => import("views/admin/dashboard/lazy"),
        index: true,
      },
      {
        path: "categories",
        lazy: () => import("views/admin/categories/lazy"),
      },
      {
        path: "market",
        lazy: () => import("views/admin/marketplace/lazy"),
      },
      {
        path: "users",
        lazy: () => import("views/admin/users/lazy"),
      },
      {
        path: "user/:uid",
        lazy: () => import("views/admin/user/lazy"),
      },
      {
        path: "profile",
        lazy: () => import("views/admin/profile/lazy"),
      },
      {
        path: "profile2",
        Component: ProfileOverview,
      },
      {
        path: "default",
        Component: Dashboard2,
      },
    ],
  },
  {
    path: "/auth/*",
    Component: AuthLayout,
    loader: authLoader,
    ErrorBoundary: RRDErrorBoundary,
    children: [
      {
        path: "",
        Component: SignInView,
      },
    ],
  },
  {
    path: "/test/*",
    Component: TestView,
    ErrorBoundary: RRDErrorBoundary,
  },
]);

export default router;
