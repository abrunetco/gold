import client, { AuthenticationResult } from "api/client";
import { ComponentType, Suspense, useEffect, useState } from "react";
import AuthLayout from "./layouts/auth";
import { Routes, Route } from "react-router-dom";
import BrandLoading from "components/progress/BrandLoading";

export default function withAuthGuard(Component: ComponentType) {
  return function AuthGuard() {
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
