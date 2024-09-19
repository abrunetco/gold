import { User, userPath } from "@gold/api";
import client, { AuthenticationResult } from "api/client";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { useAdminLoaderData } from "views/admin/loader";

export const AuthCtxt = createContext<AuthenticationResult | null>(null);

interface AuthProviderProps {
  validate?: (res?: AuthenticationResult) => boolean;
  loading?: JSX.Element;
  onFaild?: JSX.Element;
}

export default function AuthProvider(
  props: PropsWithChildren<AuthProviderProps>,
) {
  const { children } = props;
  const { auth } = useAdminLoaderData();
  const [value, setValue] = useState<AuthenticationResult>(auth);

  useEffect(() => {
    function listener(user?: User) {
      if (user?.uid === value.user?.uid) {
        setValue((ctx) => ({ ...ctx, user }));
      }
    }
    client.service(userPath).on("patched", listener);
    return () => {
      client.service(userPath).off("patched", listener);
    };
  }, [setValue, value]);

  return <AuthCtxt.Provider value={value}>{children}</AuthCtxt.Provider>;
}
