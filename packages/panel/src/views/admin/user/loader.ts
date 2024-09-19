import { User, userPath } from "@gold/api";
import client from "api/client";
import { IndexRouteObject, redirect, useLoaderData } from "react-router-dom";

interface UserDetailsLoaderData {
  user: User;
}

export const useUserDetailsLoaderData = (): UserDetailsLoaderData =>
  useLoaderData() as UserDetailsLoaderData;

export const userLoader: IndexRouteObject["loader"] = async ({ params }) => {
  console.log("params", params);
  try {
    const user = await client.service(userPath).get(params.uid);
    return { user };
  } catch {
    return redirect("/admin/users");
  }
};
