export function rowToRawData(row: any[], header: string[]): string {
  const rawDataObject: Record<string, any> = {};
  header.forEach((value, index) => {
    rawDataObject[value] = row[index];
  });
  return Object.entries(rawDataObject)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');
}
