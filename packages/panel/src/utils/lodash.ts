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

export function castArray<V = unknown>(v: V): V[];
export function castArray<V = unknown>(v: V[]): V[] {
  return Array.isArray(v) ? v : [v];
}

export function deepEqual(x: any, y: any) {
  if (x === y) {
    return true;
  } else if (
    typeof x === "object" &&
    x !== null &&
    typeof y === "object" &&
    y !== null
  ) {
    if (Object.keys(x).length != Object.keys(y).length) return false;

    for (const prop in x) {
      if (Object.prototype.hasOwnProperty.call(y, prop)) {
        if (!deepEqual(x[prop], y[prop])) return false;
      } else return false;
    }

    return true;
  } else return false;
}
