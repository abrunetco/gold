/* eslint-disable @typescript-eslint/no-explicit-any */
export function debounce<Fn extends (...args: any) => any>(
  func: Fn,
  timeout = 500,
) {
  let timer: NodeJS.Timeout;
  return (...args: Parameters<Fn>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, timeout);
  };
}
