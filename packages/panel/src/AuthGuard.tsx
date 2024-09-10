import client, { AuthenticationResult } from "api/client";
import { ComponentType, PropsWithChildren, Suspense, useEffect, useState } from "react";
import { ErrorBoundary, FallbackProps } from "react-error-boundary";
import AuthLayout from "./layouts/auth";
import { Routes, Route } from "react-router-dom";
import BrandLoading from "components/progress/BrandLoading";

async function fakeCall() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(true)
    }, 1000)
  })
}

type AuthCall<T> =
  | { t: 'p', p: Promise<T> }
  | { t: 'r', r: T } 
  | { t: 'e', e: Error } 

function suspendForCall<T>(fn: () => Promise<T>) {
  let call: AuthCall<T> = {
    t: "p",
    p: fn.call(null)
  };
  call.p 
    .then((r) => {
      call = { t: 'r', r }
    })
    .catch((e: unknown) => {
      call = { t: 'e', e: e as Error }
      return false
    });

  return () => {
    switch (call.t) {
      case 'e': return call.e
      case 'r': return call.r
    }
    return call.p
  };
}

let useAwaitPromise = suspendForCall(client.reAuthenticate)
// const useAuth = suspendForCall(fakeCall)

const Auth = (props: PropsWithChildren) => {
  const auth = useAwaitPromise()
  return props.children
};

const AuthApp = ({ resetErrorBoundary }: FallbackProps) => {
  function reload() {
    useAwaitPromise = suspendForCall(client.reAuthenticate)
    resetErrorBoundary()
  }
  return (
    <div>
      <button onClick={reload}>reload</button>
    </div>
  );
};

export default function withAuthGuard(Component: ComponentType) {
  return (props: PropsWithChildren) => {
    const [state, setState] = useState<AuthenticationResult | Promise<AuthenticationResult> | Error | undefined>()
    useEffect(() => {
      const promise = client.reAuthenticate()
      setState(promise)
      promise
        .then(setState)
        .catch(e => setState(new Error(e)))
    }, [])
    if (state instanceof Promise) return (
      <BrandLoading />
    )
    if (state instanceof Error) return (
      <Routes>
        <Route path="*" Component={AuthLayout} />
      </Routes>
    )
    return (
      <Suspense fallback={<BrandLoading />}>
        <Component />
      </Suspense>
    )
  }
}
