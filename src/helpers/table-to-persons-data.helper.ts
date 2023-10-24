import { indexHeader, mapTableHeaderToKeyAndIndexes, rowToRawData, tableFileToJson } from '.';
import { IPersonData } from '../@types';
import { PersonData } from '../classes';
import { getPersonLocation } from './get-person-location.helper';
import { Logger } from './logger.helper';

const logger = new Logger('tableToPersonsData');

export function tableToPersonsData(filepath: string): IPersonData[] {
  const personsData: IPersonData[] = [];
  const tablesJson = tableFileToJson(filepath);
  tablesJson.forEach((tableJson: any[][]) => {
    const headers = tableJson[indexHeader];
    if (!headers) {
      return false;
    }
    const keyAndIndexes = mapTableHeaderToKeyAndIndexes(headers);
    if (Object.keys(keyAndIndexes).every((key) => !keyAndIndexes[key].length)) {
      logger.warn('The table header has no database key mappings');
    }
    logger.log(`Processing file: ${filepath} (${tableJson.length - 1} rows)`);
    for (let index in tableJson) {
      const indexRow = parseInt(index);
      if ((indexRow - 1) % 100 === 0 && indexRow - 1 !== 0) {
        logger.info(`${indexRow - 1} rows processed`);
      }
      if (indexRow === indexHeader) continue;
      const personData = new PersonData(filepath, rowToRawData(tableJson[indexRow], tableJson[indexHeader]));
      Object.keys(keyAndIndexes).forEach((key) => {
        personData[key as keyof PersonData] = keyAndIndexes[key]
          .map((index: number) => tableJson[indexRow][index])
          .join(', ');
      });
      personData.location = getPersonLocation(personData);
      personsData.push(personData);
    }
  });
  logger.log('File processing completed');
  return personsData;
}
