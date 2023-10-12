import * as xlsx from 'xlsx';
import { Logger } from '.';
import { existsSync } from 'fs';

const logger = new Logger('tableFileToJson');

export function tableFileToJson(filepath: string): any[][][] {
  try {
    if (!existsSync(filepath)) {
      throw new Error('File not found');
    }

    const workbook = xlsx.readFile(filepath);
    const sheetNames = workbook.SheetNames;
    const result: any[][][] = [];

    sheetNames.forEach((sheetName) => {
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1, blankrows: false });
      const nonEmptyRows = jsonData.filter((row: any) => row.length > 0) as any[][];
      result.push(nonEmptyRows);
    });

    return result;
  } catch (e) {
    logger.error((e as Error).message);
    return [];
  }
}
