import { Button } from "components/button";
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import { Alert } from "flowbite-react";
import { PropsWithChildren } from "react";
import {
  FallbackProps,
  ErrorBoundary as ReactErrorBoundary,
} from "react-error-boundary";
import { BsExclamationOctagon } from "react-icons/bs";
import { MdRestore } from "react-icons/md";
import { useRouteError } from "react-router-dom";
import { ParsedError, parseError } from "utils/utils";

export function BrandError({
  name,
  message,
  code,
  stack,
  children,
}: PropsWithChildren<Partial<ParsedError>>) {
  const codeKbd = code ? <kbd className="me-1">[{code}]</kbd> : null;
  return (
    <Alert color="failure">
      <div className="ms-2 w-full">
        <h2 className="mb-4 flex items-center gap-2 font-extrabold">
          <BsExclamationOctagon className="h-6 w-6" />
          {codeKbd}
          {name}!
        </h2>
        <p>{message}</p>
        {stack ? (
          <pre className="ms-4 mt-4 whitespace-pre-wrap">{stack}</pre>
        ) : null}
      </div>
      {children}
    </Alert>
  );
}

function ErrorBoundaryFallback({ error, resetErrorBoundary }: FallbackProps) {
  const parsedError = parseError(error);
  return (
    <BrandError {...parsedError}>
      {error.stack}
      <div className="flex gap-2">
        <Button size="xs" color="light" onClick={resetErrorBoundary}>
          <MdRestore />
        </Button>
      </div>
    </BrandError>
  );
}

export function ErrorBoundary({ children }: PropsWithChildren) {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorBoundaryFallback}>
      {children}
    </ReactErrorBoundary>
  );
}

export function RRDErrorBoundary() {
  const err = useRouteError();
  const parsedError = parseError(err);
  return (
    <BrandError {...parsedError}>
      <div className="flex gap-2">
        <Button size="xs" color="light" onClick={() => location.reload()}>
          <MdRestore />
        </Button>
      </div>
    </BrandError>
  );
}
