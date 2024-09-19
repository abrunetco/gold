export interface ParsedError {
  code: number;
  name: string;
  message: string;
  stack?: string;
}
export function parseError(err: unknown): ParsedError {
  if (typeof err === "string")
    return {
      code: 500,
      name: "خطا",
      message: err,
    };
  if (err instanceof Error)
    return {
      code: 500,
      name: err.name,
      stack: err.stack,
      message: err.message,
    };
  if (typeof err === "object")
    return {
      code: 500,
      name: "name" in err && typeof err.name === "string" ? err.name : "",
      message:
        "message" in err && typeof err.message === "string" ? err.message : "",
    };
  else
    return {
      code: 500,
      name: "خطا نامشخص",
      message: "خطای رخ داده و منبع آن مشخص نیست",
    };
}
