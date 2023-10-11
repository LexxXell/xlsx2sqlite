import {
  Logger,
  checkFileExt,
  getAllFilePaths,
  permittedExt,
  processFileAndPushInDB,
  xlsxDirectoryPath,
} from './helpers';

const logger = new Logger('MAIN');

async function main() {
  try {
    const filepaths = getAllFilePaths(xlsxDirectoryPath);
    for (let filepath of filepaths) {
      if (!checkFileExt(filepath, permittedExt)) {
        continue;
      }
      await processFileAndPushInDB(filepath);
    }
  } catch (e) {
    logger.error((e as Error).message);
  }
}

if (require.main === module) {
  main();
}
