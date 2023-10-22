export function getIndexesByNameset(
  headers: Array<string>,
  nameIncludes: Array<string | RegExp>,
  nameExcludes?: Array<string | RegExp>,
): Array<number> {
  let result: Array<number> = [];
  headers.forEach((value_h, index) => {
    if (typeof value_h !== 'string') {
      return false;
    }
    value_h = value_h.toLowerCase();
    if (
      nameIncludes.some((value_n) => matchValues(value_h, value_n)) &&
      !nameExcludes?.some((value_n) => matchValues(value_h, value_n))
    ) {
      result.push(index);
    }
  });
  return result;
}

function matchValues(value: string, target: string | RegExp): boolean {
  if (target instanceof RegExp) {
    return target.test(value);
  } else if (typeof target === 'string') {
    return value.includes(target);
  }
  return false;
}
