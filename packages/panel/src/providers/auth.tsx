import { User, userPath } from "@gold/api";
import client, { AuthenticationResult } from "api/client";
import BrandLoading from "components/progress/BrandLoading";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const Ctxt = createContext<AuthenticationResult | null>(null);

export const useAuth = () => useContext(Ctxt);

interface AuthProviderProps {
  validate?: (res?: AuthenticationResult) => boolean;
  loading?: JSX.Element;
  onFaild?: JSX.Element;
}

function SomeErr() {
  return <div>errr</div>;
}

export default function AuthProvider(
  props: PropsWithChildren<AuthProviderProps>,
) {
  const {
    children,
    validate = (res) => !!res,
    loading = <BrandLoading />,
    onFaild = <SomeErr />,
  } = props;
  const [_loading, setLoading] = useState<boolean>(true);
  const [value, setValue] = useState<AuthenticationResult | undefined>();

  useEffect(() => {
    setLoading(true);
    client
      .reAuthenticate()
      .then(setValue)
      .catch(() => setValue(undefined))
      .finally(setLoading.bind(null, false));
  }, [setValue, setLoading]);

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

  const isValid = useMemo(() => validate(value), [validate, value]);

  if (_loading) return loading;
  if (!isValid) return onFaild;

  return <Ctxt.Provider value={value}>{children}</Ctxt.Provider>;
}
