import client from "api/client";
import { PropsWithChildren, Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import AuthLayout from "./layouts/auth";
import { Routes, Route } from "react-router-dom";

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
      console.log('calllllllll');
  let call: AuthCall<T> = {
    t: "p",
    p: fn.call(null)
  };
  call.p 
    .then((r) => {
      console.log('succccccccccccc');
      
      call = { t: 'r', r }
    })
    // Fetch request has failed
    .catch((e: unknown) => {
      console.log('errrrrrrrrrrrrrr');
      call = { t: 'e', e: e as Error }
      return false
    });

  return () => {
    if (call.t === "p") {
      throw call.p; // Suspend(A way to tell React data is still fetching)
    } else if (call.t === "e") {
      throw call.e; // Result is an error
    } else if (call.t === "r") {
      return call.r; // Result is a fulfilled promise
    }
  };
}

// const useAuth = suspendForCall(client.reAuthenticate)
const useAuth = suspendForCall(fakeCall)

const Auth = (props: PropsWithChildren) => {
  const auth = useAuth()
  console.log({auth});
  
  return (
    <div>{props.children}</div>
  )
};

const AuthApp = () => {
  return (
    <Routes>
      <Route path="*" element={<AuthLayout />} />
    </Routes>
  );
};

const AuthApp2 = () => {
  return (
    <div>
      login
    </div>
  );
};

export default function AuthGuard(props: PropsWithChildren) {
  // return props.children
  return (
    <ErrorBoundary FallbackComponent={AuthApp}>
      <Suspense fallback={<div>loading...</div>}>
        <Auth>
          {props.children}
        </Auth>
      </Suspense>
    </ErrorBoundary>
  );
}
