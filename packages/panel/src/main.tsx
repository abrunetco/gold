import "@fontsource-variable/vazirmatn";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import router from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrandSuspense } from "components/brand/Suspend";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrandSuspense>
        <RouterProvider router={router} />
      </BrandSuspense>
    </QueryClientProvider>
  </StrictMode>,
);
