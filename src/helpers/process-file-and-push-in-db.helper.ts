import { Logger, indexHeader, myDatabase, tableToPersonsData, transactionStep, xlsxDirectoryPath } from '../helpers';

const logger = new Logger('processFileAndPushInDB');

export async function processFileAndPushInDB(filepath: string) {
  try {
    const fileId = await insertFileToDB(filepath);
    const personsData = tableToPersonsData(filepath, fileId);
    personsData.splice(indexHeader, 1);

    for (let index = 0; index < personsData.length; index += transactionStep) {
      const data = personsData.slice(index, index + transactionStep);
      await myDatabase.addManyObjectToDb('person', data);
      logger.log(`Writen ${data.length} rows. Total ${index + data.length}`);
    }

    logger.log(`Added data from file ${filepath} to the database`);
  } catch (e) {
    logger.error(e);
  }
}

async function insertFileToDB(filepath: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO file (path) VALUES (?)`;
    const shortFilePath = filepath.replace(xlsxDirectoryPath, '');
    myDatabase.db.run(query, [shortFilePath], function (err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.lastID);
      }
    });
  });
}
