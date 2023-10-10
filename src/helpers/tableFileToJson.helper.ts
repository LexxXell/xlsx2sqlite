import * as xlsx from 'xlsx';
import { Logger } from '.';
import { existsSync } from 'fs';

const logger = new Logger('tableFileToJson');

export function tableFileToJson(filepath: string): any[][] {
  try {
    if (!existsSync(filepath)) {
      throw new Error('File not found');
    }

    const workbook = xlsx.readFile(filepath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = xlsx.utils.sheet_to_json(worksheet, { header: 1, blankrows: false });

    // Удаляем пустые строки
    const nonEmptyRows = jsonData.filter((row: any) => row.length > 0) as any[][];
    return nonEmptyRows;
  } catch (e) {
    logger.error((e as Error).message);
    return [];
  }
}
