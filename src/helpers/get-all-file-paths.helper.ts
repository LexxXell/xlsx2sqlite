import fs from 'fs';
import path from 'path';

export function getAllFilePaths(dir: string): string[] {
  const filepaths: string[] = [];

  function scanDirectory(currentDir: string) {
    const files = fs.readdirSync(currentDir);

    files.forEach((file) => {
      const filePath = path.join(currentDir, file);
      const isDirectory = fs.statSync(filePath).isDirectory();

      if (isDirectory) {
        scanDirectory(filePath);
      } else {
        filepaths.push(filePath);
      }
    });
  }

  scanDirectory(dir);
  return filepaths;
}
