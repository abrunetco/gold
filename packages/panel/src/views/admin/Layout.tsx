import AuthProvider from "providers/auth";
import React from "react";
import { useAdminLoaderData } from "./loader";
import Sidebar from "components/sidebar";
import Navbar from "components/navbar";
import { BrandSuspense } from "components/brand/Suspend";
import { Outlet, useLocation } from "react-router-dom";
import { identity } from "utils/lodash";
import { MARKUP_MAP } from "variables/entities";
import { balancePath, categoryPath } from "@gold/api";
import { userPath } from "@gold/api";

const brandMap: Record<string, string> = {
  admin: "پیشخوان",
  "admin/balances": MARKUP_MAP[balancePath].polar,
  "admin/users": MARKUP_MAP[userPath].polar,
  "admin/categories": MARKUP_MAP[categoryPath].polar,
};

export default function AdminLayout(props: { [x: string]: any }) {
  const [open, setOpen] = React.useState(true);
  const { sidebarLinks } = useAdminLoaderData();
  React.useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1200 ? setOpen(false) : setOpen(true),
    );
  }, []);

  const location = useLocation();
  const pathKey = location.pathname.split("/").filter(identity).join("/");
  console.log({ location });

  return (
    <AuthProvider>
      <Sidebar
        open={open}
        onClose={() => setOpen(false)}
        links={sidebarLinks}
      />
      <div className="grid min-h-[100vh] w-full grid-cols-1 grid-rows-[80px_auto_1px] gap-3 bg-lightPrimary dark:!bg-navy-900 xl:ps-[313px]">
        <Navbar
          onOpenSidenav={() => setOpen((o) => !o)}
          brandText={brandMap[pathKey]}
          // secondary={getActiveNavbar(routes)}
          {...props}
        />
        <main className="mx-3 h-full">
          <BrandSuspense>
            <Outlet />
          </BrandSuspense>
        </main>
      </div>
    </AuthProvider>
  );
}

AdminLayout.displayName = "AdminLayout";
