import { PropsWithChildren, Suspense } from "react";
import { BrandLoading } from "./Loading";

export function BrandSuspense({ children }: PropsWithChildren) {
  return <Suspense fallback={<BrandLoading />}>{children}</Suspense>;
}

BrandSuspense.displayName = "BrandSuspense";
