export function pick<T, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  const ret = {} as Pick<T, K>;
  keys.forEach((key) => {
    ret[key] = obj[key];
  });
  return ret;
}

export function strWithFallback(str: string, fallback: string) {
  if (str.length) {
    return str;
  }
  return fallback;
}

export function numberToArr(num: number) {
  return [...Array(num).keys()];
}
