import "@fontsource-variable/vazirmatn";
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AuthGuard from "./AuthGuard";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthGuard>
        <App />
      </AuthGuard>
    </BrowserRouter>
  </StrictMode>,
);
