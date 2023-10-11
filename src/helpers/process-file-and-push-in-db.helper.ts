import { Logger, indexHeader, myDatabase, tableToPersonsData, transactionStep } from '../helpers';

const logger = new Logger('processFileAndPushInDB');

export async function processFileAndPushInDB(filename: string) {
  try {
    const personsData = tableToPersonsData(filename);
    personsData.splice(indexHeader, 1);

    for (let index = 0; index < personsData.length; index += transactionStep) {
      const data = personsData.slice(index, index + transactionStep);
      await myDatabase.addManyObjectToDb('person', data);
      logger.log(`Writen ${data.length} rows. Total ${index + data.length}`);
    }

    logger.log(`Added data from file ${filename} to the database`);
  } catch (e) {
    logger.error(e);
  }
}
