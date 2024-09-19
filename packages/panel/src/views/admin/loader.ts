import { AuthenticationParams } from "@gold/api";
import client from "api/client";
import { LinkType } from "components/sidebar/components/Links";
import { IndexRouteObject, redirect, useLoaderData } from "react-router-dom";
import { sidebarLinks } from "./sidebar";

interface AdminLoaderData {
  auth: AuthenticationParams;
  sidebarLinks: LinkType[];
}

export const useAdminLoaderData = (): AdminLoaderData =>
  useLoaderData() as AdminLoaderData;

export const adminLoader: IndexRouteObject["loader"] = async () => {
  try {
    const auth = await client.reAuthenticate();
    return { auth, sidebarLinks };
  } catch {
    return redirect("/auth");
  }
};
