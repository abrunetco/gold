import { RRDErrorBoundary } from "components/brand/errors";
import AdminLayout from "./Layout";
import { adminLoader } from "./loader";

export const Component = AdminLayout;
export const loader = adminLoader;
export const ErrorBoundary = RRDErrorBoundary;
