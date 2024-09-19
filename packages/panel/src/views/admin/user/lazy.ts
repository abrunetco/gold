import { RRDErrorBoundary } from "components/brand/errors";
import UserDetailsView from "./index";
import { userLoader } from "./loader";

export const Component = UserDetailsView;
export const loader = userLoader;
export const ErrorBoundary = RRDErrorBoundary;
