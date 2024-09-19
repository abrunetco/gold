import { AuthenticationParams } from "@gold/api";
import client from "api/client";
import { LinkType } from "components/sidebar/components/Links";
import { IndexRouteObject, redirect, useLoaderData } from "react-router-dom";

interface AdminLoaderData {
  auth: AuthenticationParams;
  sidebarLinks: LinkType[];
}

export const useAdminLoaderData = (): AdminLoaderData =>
  useLoaderData() as AdminLoaderData;

export const authLoader: IndexRouteObject["loader"] = async () => {
  try {
    await client.reAuthenticate();
    return redirect("/admin");
  } catch {
    return {};
  }
};
