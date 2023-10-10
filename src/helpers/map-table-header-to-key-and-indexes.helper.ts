import { getIndexesByNameset, mapTablePattern } from '.';

export function mapTableHeaderToKeyAndIndexes(headers: Array<string>): Record<string, number[]> {
  const keyAndIndexes: Record<string, number[]> = {};
  Object.keys(mapTablePattern).forEach((key) => {
    keyAndIndexes[key] = getIndexesByNameset(
      headers,
      mapTablePattern[key as keyof typeof mapTablePattern].include,
      mapTablePattern[key as keyof typeof mapTablePattern].exclude,
    );
  });
  return keyAndIndexes;
}
